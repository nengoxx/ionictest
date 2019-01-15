import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

  public vehicles: Array<{ name: string; model: string; manufacturer: string }> = [];

  reqVehicles(){
    var req = new XMLHttpRequest();
    var URLhost = 'https://swapi.co/api/vehicles/';
    var response;

    req.open('GET', URLhost, true);
    req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      response = JSON.parse(req.responseText);
      console.log(response);
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
    req.send(null);
    event.preventDefault();

    var i = 1;
    while (response.next != null) {
      this.vehicles.push({
        name: response.results[0].name,
        model: response.results[0].model,
        manufacturer: response.results[0].manufacturer
      });
    }
  }


  constructor() { }

  ngOnInit() {
  }

}
