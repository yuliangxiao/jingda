///<reference path="../../assets/js/jquery.d.ts"/>
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-declaredetailed',
  templateUrl: 'declaredetailed.html'
})

export class DeclaredetailedPage {
  public params: Text;
  public typeTxt: any;
  public input_txt: Text;
  public file: any;
  public blid: number;
  public items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.params = this.navParams.get('title');
  }
  getItems(ev: any) {

    let val = ev.target.value;

    if (val && val.trim() != '') {

      this.http.request('http://127.0.0.1:8888/GetBLList')
        .toPromise()
        .then(res => {
          this.items = res;
        })
        .catch(err => { console.error(err) });
    }
  }
}
