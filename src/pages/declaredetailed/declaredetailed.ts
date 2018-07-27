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
  public params: Text;
  public items = [];
  public is_first: boolean;
  public count: number = 1;
  private keyword: string = '';
  private is_loading: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController) {

    this.params = this.navParams.get('title');
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
    this.http.request(server + 'GetBLList?keyword=' + this.keyword + '&count=' + this.count)
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
      console.log(data);
    });
    profileModal.present();
  }
  pressEvent(BLID: number) {
    let btn_arr = [ '已收取', '已申报', '已验货', '已通关'];
    new ShowActionSheet(this.actionSheetCtrl).presentActionSheet('选择状态', btn_arr, (res: string) => {

    });
  }
}
