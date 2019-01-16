import { Component, OnInit } from '@angular/core';
import { Data_manager } from '../data_objects';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.page.html',
  styleUrls: ['./starships.page.scss'],
})
export class StarshipsPage implements OnInit {

  public dataman = new Data_manager();
  public starships = this.dataman.starships;

  reqStarshipsRecursive(next){
    if (next == null) {
      return;
    }
    var me = this;
    var dataman = this.dataman;
    var response;
    var URLhost = next;
    var req = new XMLHttpRequest();
    req.open('GET', URLhost, true);
    req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      response = JSON.parse(req.responseText);
      console.log(response);
      dataman.setStarships(response);
      me.reqStarshipsRecursive(response.next);
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
    req.send();
  }


  constructor() {
    if (this.dataman.starships.length > 0) {
      console.log('Starships already set up!');
      return;
    }
    this.reqStarshipsRecursive('https://swapi.co/api/starships/')
  }

  ngOnInit() {
  }

}
