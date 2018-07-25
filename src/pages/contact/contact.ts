///<reference path="../../assets/js/jquery.d.ts"/>
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
  public params: Text;
  public typeTxt: any;
  public input_txt: Text;
  public file: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.params = this.navParams.get('title');
  }
  switchType() {
    this.http.request('http://127.0.0.1:8888/GetBLNo?id=' + this.typeTxt)
      .toPromise()
      .then(res => {
        this.input_txt = res.json()[0].BLNo;
      })
      .catch(err => { console.error(err) });
  }
  select_img() {
    $("#file").click();
  }
}
