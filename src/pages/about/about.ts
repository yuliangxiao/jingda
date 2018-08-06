import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { SendcarPage } from '../sendcar/sendcar';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
  GoNew(title) {
    this.navCtrl.push(ContactPage, { title: title });
  }
  go_sendcar() {
    this.navCtrl.push(SendcarPage);
  }
}
