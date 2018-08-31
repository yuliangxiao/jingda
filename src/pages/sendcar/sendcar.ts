import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController, ModalController, ToastController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SearchPage } from './search';
import { server } from '../../assets/js/server_path'
import { ContactPage } from '../contact/contact';


import { ShowToast, ShowActionSheet, Loading } from '../../assets/js/common'
import { SendcardetailedPage } from '../sendcardetailed/sendcardetailed'

import { Storage } from '@ionic/storage';
import { Toast } from '../../providers/tips/tips';
import { CommonProvider, IResponseData } from '../../providers/common/common';
/**
 * Generated class for the SendcarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendcar',
  templateUrl: 'sendcar.html',
})
export class SendcarPage {
  public items = [];
  public is_first: boolean;
  public count: number = 1;
  private is_loading: boolean = false;
  private username = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public httpReq: CommonProvider,
    private toast: Toast,
    private storage: Storage) {
    storage.get('username').then((val) => {
      this.username = val;
    });
  }

  ionViewDidLoad() {
    this.is_first = false;
    this.request_url();
  }
  getItems(ev: any) {
    let val = ev.target.value;
    if (!this.is_loading) {
      this.items = [];
      this.count = 1;
      this.request_url();
    }

  }

  request_url() {
    this.is_loading = true;
    this.http.request(server + 'GetDispatchedCar')
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
      // if (data.param1 != undefined) {
      //   this.param1 = data.param1;
      //   this.param2 = data.param2;
      //   this.param3 = data.param3;
      //   this.param4 = data.param4;
      //   this.param9 = data.param9;
      //   this.sheetname = data.param5;
      //   if (!this.is_loading) {
      //     this.items = [];
      //     this.count = 1;
      //     this.request_url();
      //   }
      // }
    });
    profileModal.present();
  }
  goNews(BLID) {
    let loading = new Loading(this.loadingCtrl);
    loading.loading('正在加载');
    this.httpReq.get(server + 'GetCarDetailed?BLID=' + BLID).then((res) => {
      this.navCtrl.push(SendcardetailedPage, {
        BLID: BLID, DataObj: res[0]
      });
    });
    loading.dismiss();
  }
  pressEvent(BLID: number, SrcBLID: number, TradeType: number) {
    let btn_arr = ['跳转拍照'];
    switch (TradeType) {
      case 1:
        btn_arr = ['跳转拍照', '到达货场', '发车', '到达送货地', '驶离', '结束派送'];
        break;
      case 2:
        btn_arr = ['跳转拍照', '发车', '到达提货地点', '驶离', '到达货场', '结束提货'];
        break;
    }
    new ShowActionSheet(this.actionSheetCtrl).presentActionSheet('选择状态', btn_arr, (res_str: string) => {
      // let loading = this.loadingCtrl.create({
      //   content: '请等待'
      // });
      // loading.present();
      if (res_str == "跳转拍照") {
        this.navCtrl.push(ContactPage, { title: '跳转拍照', BLID: BLID });
      }
      else {
        let loading = new Loading(this.loadingCtrl);
        loading.loading('正在提交');
        this.httpReq.post(server + 'AddTAirblStatus', {
          BLID: SrcBLID,
          Status: res_str,
          UserName: this.username
        }).then((res) => {
          this.toast.show("成功");
        });
        loading.dismiss();
      }
      //   this.http.request(server + `ChangeBLStatus?BLID=${BLID}&&Status=${res_str}&&sheetname=${this.sheetname}`)
      //     .toPromise()
      //     .then(res => {
      //       if (res.json().status == 0) {
      //         this.items = [];
      //         this.request_url();
      //       }
      //       else {
      //         new ShowToast(this.toastCtrl).presentToast(res.json().msg);
      //       }
      //       loading.dismiss();
      //     })
      //     .catch(err => { console.error(err); loading.dismiss(); });
      // });
    });
  }
}
