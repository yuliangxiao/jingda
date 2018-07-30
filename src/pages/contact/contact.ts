///<reference path="../../assets/js/jquery.d.ts"/>
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { server } from '../../assets/js/server_path';
import { Loading } from '../../assets/js/common';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
  public params: Text;
  public typeTxt: any;
  public input_txt: Text;
  public file: any;
  public blid: number;
  public img_str: string;
  img_list: Array<string> = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private transfer: FileTransfer,
    private sanitizer: DomSanitizer) {
    this.params = this.navParams.get('title');
    this.blid = 0;
    // 设置选项

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


  sub_order() {
    if (this.blid == 0) {
      this.showAlert(1, "请选择单子!");
      return false;
    }
    if (this.img_list.length == 0) {
      this.showAlert(1, "请选择图片!");
      return false;
    }
    let loading = new Loading(this.loadingCtrl);
    loading.loading('正在登录');
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

}
