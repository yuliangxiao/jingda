import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { DeclaredetailedPage } from '../declaredetailed/declaredetailed';
import { TallyPage } from '../tally/tally';
import { LoginPage } from '../login/login';
import { DetailedPage } from './detailed';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private storage: Storage) {
    storage.get('islogin').then((val) => {
      if (val != '0') {
        this.navCtrl.push(LoginPage);
      }
    });
  }
  goNews() {
    this.navCtrl.push(AboutPage);
  }
  go_declare() {
    this.navCtrl.push(DeclaredetailedPage);
  }
  go_tally() {
    this.navCtrl.push(TallyPage);
  }
  go_login() {
    this.storage.set('islogin', '1');
    this.navCtrl.push(LoginPage);
  }
  go_detailed() {
    this.navCtrl.push(DetailedPage);
  }
}
