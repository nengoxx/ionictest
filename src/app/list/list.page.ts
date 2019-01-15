import { Component, OnInit } from '@angular/core';
import { Data_manager } from '../data_objects';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public dataman = new Data_manager();
  public films = this.dataman.films;

  reqFilms(){
    var req = new XMLHttpRequest();
    var URLhost = 'https://www.swapi.co/api/films/';
    var dataman = this.dataman;

    req.open('GET', URLhost, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        console.log(response);
        dataman.setFilms(response);
      } else {
        console.log('Error in network request: ' + req.statusText);
      }});
    req.send();
  }

  constructor() {
    this.reqFilms();
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
