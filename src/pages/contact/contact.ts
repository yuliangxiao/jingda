import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public params: Text;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.params = this.navParams.get('title');
  }
}
