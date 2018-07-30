import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-detailed',
    templateUrl: 'detailed.html'
})

export class DetailedPage {
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    }
}
