import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ShowToast } from '../../assets/js/common'
@Component({
    selector: 'page-tallysearch',
    templateUrl: 'tallysearch.html'
})

export class TallySearchPage {
    private param1: boolean = false;
    private param2: boolean = false;
    private param3: boolean = false;
    private param4: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public toastCtrl: ToastController) {

    }
    dismiss() {
        if (!this.param1 && !this.param2 && !this.param3 && !this.param4) {
            new ShowToast(this.toastCtrl).presentToast('请至少选择一个状态');
            return false;
        }
        this.viewCtrl.dismiss({
            'param1': this.param1,
            'param2': this.param2,
            'param3': this.param3,
            'param4': this.param4,
        });
    }
    dismiss_no() {
        this.viewCtrl.dismiss({});
    }
    btn_click(param: boolean) {
        if (param) {
            param = false;
        }
        else {
            param = true;
        }
        return param;
    }
}
