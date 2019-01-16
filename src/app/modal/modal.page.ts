import { Component, OnInit } from '@angular/core';
import { NavController,ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  public data;

  constructor(private navParams: NavParams, private nav:NavController,
    private modalCtrl:ModalController) {
  }

  ionViewWillLoad() {
    this.data = this.navParams.get('data');
  }

  ngOnInit() {
  }

  closeModal()
  {
    this.modalCtrl.dismiss();
  }

}
