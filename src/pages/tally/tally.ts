import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController, ToastController, ModalController, ActionSheetController } from 'ionic-angular';

import { server } from '../../assets/js/server_path'

import { ShowToast, ShowActionSheet } from '../../assets/js/common'
import { TallySearchPage } from './tallysearch'


@Component({
  selector: 'page-tally',
  templateUrl: 'tally.html'
})

export class TallyPage {
  public items = [];
  public count: number = 1;
  private is_loading: boolean = false;
  private param1: boolean = false;
  private param2: boolean = true;
  private param3: boolean = true;
  private param4: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController) {
    this.count = 1;
    this.request_url();
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      if (!this.is_loading) {
        this.count = this.count + 1;
        this.request_url();
        infiniteScroll.complete();
      }
    }, 500);
  }
  request_url() {
    this.is_loading = true;
    this.http.request(server + `GetTStorageBLList?count=${this.count}&&param1=${this.param1}&&param2=${this.param2}&&param3=${this.param3}&&param4=${this.param4}`)
      .toPromise()
      .then(res => {
        if (res.json().length > 0) {
          res.json().forEach(element => {
            this.items.push(element);
          });
        }
        else {
          new ShowToast(this.toastCtrl).presentToast('没有更多数据了');
          this.count = this.count - 1;
        }
        this.is_loading = false;
      })
      .catch(err => { console.error(err) });
  }
  pressEvent(BLID: number, status: number) {
    let btn_arr = [];
    if (status == 2) {
      btn_arr = ['确认收货'];
    }
    else if (status == 3) {
      btn_arr = ['取消收货'];
    }
    new ShowActionSheet(this.actionSheetCtrl).presentActionSheet('选择操作', btn_arr, (res: string) => {
      let loading = this.loadingCtrl.create({
        content: '请等待'
      });
      loading.present();
      this.http.request(server + `ChangeTStorageBLStatus?BLID=${BLID}&&Status=${status}`)
        .toPromise()
        .then(res => {
          if (res.json().status == 0) {
            this.items = [];
            this.request_url();
          }
          else {
            new ShowToast(this.toastCtrl).presentToast(res.json().msg);
          }
          loading.dismiss();
        })
        .catch(err => { console.error(err); loading.dismiss(); });
    });
  }
  go_search() {
    let profileModal = this.modalCtrl.create(TallySearchPage);
    profileModal.onDidDismiss(data => {
      if (data.param1 != undefined) {
        this.param1 = data.param1;
        this.param2 = data.param2;
        this.param3 = data.param3;
        this.param4 = data.param4;
        if (!this.is_loading) {
          this.items = [];
          this.count = 1;
          this.request_url();
        }
      }
    });
    profileModal.present();
  }
}
