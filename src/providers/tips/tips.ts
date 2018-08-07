import { Injectable } from '@angular/core';
import { LoadingController, ToastController, ModalController, ActionSheetController } from 'ionic-angular';

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
