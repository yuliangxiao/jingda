import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController, LoadingController, ModalController, ToastController, ActionSheetController } from 'ionic-angular';

import { SearchPage } from './search';
import { server } from '../../assets/js/server_path'

import { ShowToast, ShowActionSheet } from '../../assets/js/common'


@Component({
  selector: 'page-declaredetailed',
  templateUrl: 'declaredetailed.html'
})

export class DeclaredetailedPage {
  public items = [];
  public is_first: boolean;
  public count: number = 1;
  private keyword: string = '';
  private is_loading: boolean = false;

  private param1: boolean;
  private param2: boolean;
  private param3: boolean;
  private param4: boolean;
  private param9: boolean;
  private sheetname: string = 'TSeaBL';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController) {

    this.is_first = false;
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
  getItems(ev: any) {
    let val = ev.target.value;
    if (val != this.keyword) {
      if (!this.is_loading) {
        this.items = [];
        this.count = 1;
        this.keyword = val;
        this.request_url();
      }
    }

  }
  request_url() {
    this.is_loading = true;
    this.http.request(server + 'GetBLList?keyword=' + this.keyword + '&count=' + this.count + '&param1=' + this.param1 + '&param2=' + this.param2
      + '&param3=' + this.param3 + '&param4=' + this.param4 + '&param9=' + this.param9 + '&sheetname=' + this.sheetname)
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
  go_search() {
    let profileModal = this.modalCtrl.create(SearchPage);
    profileModal.onDidDismiss(data => {
      if (data.param1 != undefined) {
        this.param1 = data.param1;
        this.param2 = data.param2;
        this.param3 = data.param3;
        this.param4 = data.param4;
        this.param9 = data.param9;
        this.sheetname = data.param5;
        if (!this.is_loading) {
          this.items = [];
          this.count = 1;
          this.request_url();
        }
      }
    });
    profileModal.present();
  }
  pressEvent(BLID: number) {
    let btn_arr = ['已收取', '已申报', '已验货', '已通关'];
    new ShowActionSheet(this.actionSheetCtrl).presentActionSheet('选择状态', btn_arr, (res_str: string) => {
      let loading = this.loadingCtrl.create({
        content: '请等待'
      });
      loading.present();
      console.log(res_str);
      this.http.request(server + `ChangeBLStatus?BLID=${BLID}&&Status=${res_str}&&sheetname=${this.sheetname}`)
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
}
