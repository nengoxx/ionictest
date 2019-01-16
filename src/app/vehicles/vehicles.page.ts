import { Component, OnInit } from '@angular/core';
import { Data_manager } from '../data_objects';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

  public dataman = new Data_manager();
  public vehicles = this.dataman.vehicles;

  // reqVehicles(){
  //   var dataman = this.dataman;
  //   var response;
  //   var next = 'https://swapi.co/api/vehicles/?page=1';
  //   // var i = 1;
  //
  //   while (next != null) {
  //   // while (i < 5) {
  //     // var URLhost = 'https://swapi.co/api/vehicles?page=/'+i;
  //     var URLhost = next;
  //     var req = new XMLHttpRequest();
  //     req.open('GET', URLhost, true);
  //     req.addEventListener('load',function(){
  //     if(req.status >= 200 && req.status < 400){
  //       response = JSON.parse(req.responseText);
  //       console.log(response);
  //       dataman.setVehicles(response);
  //       next = response.next;
  //     } else {
  //       console.log('Error in network request: ' + req.statusText);
  //       next = null;
  //     }});
  //     req.send();
  //   }
  // }

  reqVehiclesRecursive(next){
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
      dataman.setVehicles(response);
      me.reqVehiclesRecursive(response.next);
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
    req.send();
  }


  constructor() {
    if (this.dataman.vehicles.length > 0) {
      console.log('Vehicles already set up!');
      return;
    }
    this.reqVehiclesRecursive('https://swapi.co/api/vehicles/')
    // this.reqVehicles();
  }

  ngOnInit() {
  }

}
