import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';

/*
  Generated class for the TipsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActionSheet {
  constructor(public actionSheetCtrl: ActionSheetController) {

  }
  show(title: string, btn_list: Array<string>, callBack: any) {
    let btns = [];
    btn_list.forEach(ele => {
      let btn = {
        text: ele,
        handler: () => {
          callBack(ele);
        }
      }
      btns.push(btn);
    })
    btns.push({
      text: '取消',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    });
    const actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: btns
    });
    actionSheet.present();
  }
}
@Injectable()
export class Loading {
  private loadinger: any;
  constructor(public loadingCtrl: LoadingController) {

  }
  show(content: string = '请等待') {
    this.loadinger = this.loadingCtrl.create({
      content: content
    });
    this.loadinger.present();
  }
  dismiss() {
    this.loadinger.dismiss();
  }
}
@Injectable()
export class Confirm {
  constructor(public alertCtrl: AlertController) {

  }
  showConfirm(title: string = '提示', msg: string = '确定提交?', callBack: any) {
    const confirm = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: '取消',
          handler: () => {
            callBack(false);
          }
        },
        {
          text: '确定',
          handler: () => {
            callBack(true);
          }
        }
      ]
    });
    confirm.present();
  }
}
@Injectable()
export class Toast {
  constructor(public toastCtrl: ToastController) {

  }
  show(msg: string, time: number = 2000) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: time
    });
    toast.present();
  }
}