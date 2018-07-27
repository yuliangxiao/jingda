import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { DeclaredetailedPage } from '../declaredetailed/declaredetailed';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  goNews() {
    this.navCtrl.push(AboutPage);
  }
  go_declare(){
    this.navCtrl.push(DeclaredetailedPage);
  }
}
