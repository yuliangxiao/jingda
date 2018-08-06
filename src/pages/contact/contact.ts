///<reference path="../../assets/js/jquery.d.ts"/>
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { server } from '../../assets/js/server_path';
import { Loading, Confirm, ShowToast } from '../../assets/js/common';
import { BasicFeePage } from './basic_fee';
import { Geolocation } from '@ionic-native/geolocation';



declare var BMap;
declare var BMapLib;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
  public params: Text;
  public typeTxt: any;
  public input_txt: Text;
  public blid: number;
  public img_str: string;
  public feeid: any;
  public fee_list: any = [];
  img_list: Array<string> = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    private imagePicker: ImagePicker) {
    this.params = this.navParams.get('title');
    new ShowToast(this.toastCtrl).presentToast('请打开GPS准确定位');
    this.blid = 0;
  }

  switchType() {
    this.http.request(server + 'GetBLNo?id=' + this.typeTxt)
      .toPromise()
      .then(res => {
        if (res.json()[0].BLNo == undefined) {
          this.showAlert(1, "没有单子!");
          return false;
        }
        this.input_txt = res.json()[0].BLNo;
        this.blid = res.json()[0].BLID;
      })
      .catch(err => { console.error(err) });
  }
  select_img() {
    this.img_list = [];
    this.img_str = "";
    let loading = this.loadingCtrl.create({
      content: '请等待'
    });
    const options: ImagePickerOptions = {
      maximumImagesCount: 6,
      width: 500,
      height: 500,
      quality: 10,
      outputType: 1,
    };
    this.imagePicker.getPictures(options).then((results) => {
      loading.present();
      for (var i = 0; i < results.length; i++) {
        this.img_list.push('data:image/jpeg;base64,' + results[i]);
      }
      loading.dismiss();
    }, () => {
    });
  }
  showAlert(type: number, content: string) {
    let alert = this.alertCtrl.create({
      title: type == 0 ? '提示' : '警告',
      subTitle: content,
      buttons: ['确定']
    });
    alert.present();
  }
  getGPS() {
    this.geolocation.getCurrentPosition().then((resp) => {

      console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);

    }).catch(e => {

      console.log('Error happened when get current position.');

    });

  }
  sub_order() {
    if (this.blid == 0) {
      this.showAlert(1, "请选择单子!");
      return false;
    }
    if (this.img_list.length == 0) {
      this.showAlert(1, "请选择图片!");
      return false;
    }

    if (this.fee_list.length == 0) {
      new Confirm(this.alertCtrl).showConfirm('警告', '未录入费用,是否继续', (bl: boolean) => {
        if (bl) {
          this.sub_order_url();
        }
      });
    }
    else {
      this.sub_order_url();
    }
  }
  sub_order_url() {

    let has_null_amt = false;
    this.fee_list.forEach(ele => {
      if (ele.Amt == '') {
        has_null_amt = true;
      }
    })
    if (has_null_amt) {
      this.showAlert(1, "含有未录入金额的费用,无法提交");
      return false;
    }
    let loading = new Loading(this.loadingCtrl);
    loading.loading('正在提交');
    $.ajax({
      url: server + 'InsertFee?id=' + this.blid,
      type: 'post',
      async: false,
      data: { "list": JSON.stringify(this.fee_list) },
      success: function () {
      },
      error: function () {
        console.log("error");
      }
    });
    this.img_list.forEach((ele) => {
      $.ajax({
        url: server + 'InsertImg?id=' + this.blid,
        type: 'post',
        async: false,
        data: { img: ele },
        success: function () {
        },
        error: function () {
          console.log("error");
        }
      });
    })
    loading.dismiss();
    this.showAlert(0, "保存成功!");
  }
  go_basicfee() {
    let profileModal = this.modalCtrl.create(BasicFeePage);
    profileModal.onDidDismiss(data => {
      if (data.FeeID != undefined) {

        this.fee_list.push({
          'FeeID': data.FeeID,
          'FeeCN': data.FeeCN,
          'Amt': ''
        })
      }
    });
    profileModal.present();
  }
}
