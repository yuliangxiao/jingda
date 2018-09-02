import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController, ToastController, ModalController, ActionSheetController } from 'ionic-angular';

import { server } from '../../assets/js/server_path'

import { ShowToast, ShowActionSheet } from '../../assets/js/common'
import { TallySearchPage } from './tallysearch'
import { Storage } from '@ionic/storage';
import { CommonProvider } from '../../providers/common/common';


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
  private username = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private httpReq: CommonProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public storage: Storage) {
    this.count = 1;
    this.request_url();
    this.storage.get('username').then((val) => {
      this.username = val;
    });
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
  pressEvent(BLID: number, status: number, SrcBsBLID: number, BLTypeID: number) {
    let btn_arr = [];
    if (status == 2) {
      if (BLTypeID == 11) {
        btn_arr = ['确认收货'];
      }
      else {
        btn_arr = ['确认出库'];
      }
    }
    else if (status == 3) {
      if (BLTypeID == 11) {
        btn_arr = ['取消收货'];
      }
      else {
        btn_arr = ['取消出库'];
      }
    }
    new ShowActionSheet(this.actionSheetCtrl).presentActionSheet('选择操作', btn_arr, (res: string) => {
      let loading = this.loadingCtrl.create({
        content: '请等待'
      });
      loading.present();
      this.httpReq.post(server + 'ChangeTStorageBLStatus', {
        BLID: BLID,
        SrcBsBLID: SrcBsBLID,
        Status: status,
        Status_Str: res,
        UserName: this.username
      }).then((res) => {
        loading.dismiss();
        new ShowToast(this.toastCtrl).presentToast("更改成功");
        this.items = [];
        this.request_url();
      }).catch((reserr) => {
        loading.dismiss();
        new ShowToast(this.toastCtrl).presentToast('更改失败');
      });
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
