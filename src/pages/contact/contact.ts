import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public params: Text;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.params = this.navParams.get('title');
    this.ionViewDidLoad();
  }
  ionViewDidLoad() {
    // 网络请求
    this.http.request('http://127.0.0.1:8888/GetBLNo')
      .subscribe((res: Response) => {
        console.log(res);
      });
  }

}
