import { Component } from '@angular/core';
import { Data_manager } from '../data_objects';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public dataman = new Data_manager();
}
