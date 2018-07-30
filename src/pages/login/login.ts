import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Md5 } from "ts-md5/dist/md5";
import { Http } from '@angular/http';
import { LoadingController, ToastController } from 'ionic-angular';
import { server } from '../../assets/js/server_path';
import { ShowToast, Loading } from '../../assets/js/common';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private username: string = 'good';
  private password: string = '0000';
  constructor(public navCtrl: NavController, private http: Http, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private storage: Storage) {

  }
  login() {
    if (this.username == '') {
      new ShowToast(this.toastCtrl).presentToast('请输入用户名');
      return false;
    }
    if (this.password == '') {
      new ShowToast(this.toastCtrl).presentToast('请输入密码');
      return false;
    }
    let loading = new Loading(this.loadingCtrl);
    loading.loading('正在登录');
    this.http.request(server + `checkLogin?username=${this.username}&password=${Md5.hashStr(this.password).toString()}`)
      .toPromise()
      .then(res => {
        if (res.json().status == 0) {
          this.storage.set('islogin', '0');
          this.navCtrl.push(HomePage);
        }
        else {
          new ShowToast(this.toastCtrl).presentToast(res.json().msg);
        }
        loading.dismiss();
      })
      .catch(err => { console.error(err); });

  }
}
