import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { DeclaredetailedPage } from '../declaredetailed/declaredetailed';
import { TallyPage } from '../tally/tally';
import { LoginPage } from '../login/login';
import { DetailedPage } from './detailed';
import { Storage } from '@ionic/storage';

import { JPushService } from 'ionic2-jpush/dist'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [JPushService]
})
export class HomePage {

  constructor(public navCtrl: NavController, private storage: Storage, private jPushPlugin: JPushService) {
    storage.get('islogin').then((val) => {
      if (val != '0') {
        this.navCtrl.push(LoginPage);
      }
    });
    let openNotification = this.jPushPlugin.openNotification()
      .subscribe(res => {
        console.log(res);
        console.log('收到点击通知事件')
      })


    let receiveNotification = this.jPushPlugin.receiveNotification()
      .subscribe(res => {
        console.log(res)
        console.log('收到通知')
      })

    let receiveMessage = this.jPushPlugin.receiveMessage()
      .subscribe(res => {
        console.log(res)
        console.log('收到自定义消息')
      })

    let backgroundNotification = this.jPushPlugin.backgroundNotification()
      .subscribe(res => {
        console.log(res)
        console.log('收到后台通知')
      })

  }
  /**
 * 注册极光
 */
  init() {
    this.jPushPlugin.init()
      .then(res => alert(res))
      .catch(err => alert(err))
  }

  /**
  * 获取ID
  */
  getRegistrationID() {
    this.jPushPlugin.getRegistrationID()
      .then(res => alert(res))
      .catch(err => alert(err))
  }

  goNews() {
    this.navCtrl.push(AboutPage);
  }
  go_declare() {
    this.navCtrl.push(DeclaredetailedPage);
  }
  go_tally() {
    this.navCtrl.push(TallyPage);
  }
  go_login() {
    this.storage.set('islogin', '1');
    this.navCtrl.push(LoginPage);
  }
  go_detailed() {
    this.navCtrl.push(DetailedPage);
  }
}
