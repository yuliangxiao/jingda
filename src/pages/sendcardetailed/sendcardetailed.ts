///<reference path="../../assets/js/jquery.d.ts"/>
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { CommonProvider, IResponseData } from '../../providers/common/common';
import { server } from '../../assets/js/server_path'
import { ShowToast, Loading } from '../../assets/js/common'
/**
 * Generated class for the SendcardetailedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendcardetailed',
  templateUrl: 'sendcardetailed.html',
})
export class SendcardetailedPage {
  private BLID: number = 0;
  private DataObj: DataClass;
  private Is_Display = false;
  private GoodsList: any;
  private IsHaveBad = false;
  private IsHaveWet = false;
  private SrcBLID: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public httpReq: CommonProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    this.BLID = this.navParams.get('BLID');
    this.DataObj = this.navParams.get('DataObj');
    this.GoodsList = this.navParams.get('GoodsList');
    this.SrcBLID = this.navParams.get('SrcBLID');
    this.IsHaveBad = this.DataObj.IsHaveBad == 1 ? true : false;
    this.IsHaveWet = this.DataObj.IsHaveWet == 1 ? true : false;
    if (this.DataObj.SignImg == null) {
      this.Is_Display = true;
    }
  }

  ionViewDidLoad() {
    canvas_start();
  }
  cleanCanvas() {
    clearEl();
  }
  subOrder() {
    let loading = new Loading(this.loadingCtrl);
    loading.loading('正在提交');
    $.ajax({
      url: server + 'ChangeCarDetailed',
      type: 'post',
      async: false,
      data: { img: respImg(), BLID: this.BLID, SrcBLID: this.SrcBLID, IsHaveBad: this.IsHaveBad ? 1 : 0, IsHaveWet: this.IsHaveWet ? 1 : 0 },
      success: function () {

      },
      error: function () {
        console.log("error");
      }
    });
    new ShowToast(this.toastCtrl).presentToast('提交成功');
    loading.dismiss();
  }
}
class DataClass {
  PickupPlace;
  DeliverPlace;
  Voy;
  PreDeliverTime;
  HBLNo;
  MBLNo;
  Qty;
  Weight;
  Volume;
  GoodsName;
  TradeType;
  PickupTime;
  DeliverTime;
  CarNo;
  CurrDate;
  SignImg;
  IsHaveBad;
  IsHaveWet;
}
