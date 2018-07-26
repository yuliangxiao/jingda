import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DeclaredetailedPage } from '../declaredetailed/declaredetailed';
@Component({
  selector: 'page-declare',
  templateUrl: 'declare.html'
})
export class DeclarePage {

  constructor(public navCtrl: NavController) {

  }
  GoNew(title) {
    this.navCtrl.push(DeclaredetailedPage, { title: title });
  }
}
