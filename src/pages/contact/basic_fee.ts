import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { server } from '../../assets/js/server_path';


@Component({
  templateUrl: 'basic_fee.html'
})

export class BasicFeePage {
  public items: any = [];

  public all_items: any = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public viewCtrl: ViewController) {
    this.load_fee();
    this.initializeItems();
  }
  load_fee() {
    this.http.request(server + 'GetFeeList')
      .toPromise()
      .then(res => {
        this.all_items = res.json();
        this.items = this.all_items;
      })
      .catch(err => { console.error(err) });
  }
  dismiss_no() {
    this.viewCtrl.dismiss({});
  }
  initializeItems() {
    this.items = this.all_items;
  }
  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.FeeCN.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.initializeItems();
    }
  }
  check_item(FeeCN: string, FeeID, number) {
    this.viewCtrl.dismiss({
      FeeCN,
      FeeID
    });
  }
}
