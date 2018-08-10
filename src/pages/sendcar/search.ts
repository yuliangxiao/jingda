import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { ActionSheet, Loading, Confirm, Toast } from '../../providers/tips/tips'
@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})

export class SearchPage {
    private param1: boolean = false;
    private param2: boolean = false;
    private param3: boolean = false;
    private param4: boolean = false;
    private param5: boolean = true;
    private param6: boolean = false;
    private param7: boolean = false;
    private param8: boolean = false;
    private param9: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private actionSheet: ActionSheet) {

    }
    dismiss() {
        this.viewCtrl.dismiss({
            'param1': this.param1,
            'param2': this.param2,
            'param3': this.param3,
            'param4': this.param4,
            'param9': this.param9,
            'param5': this.param5 ? 'param5' : this.param6 ? 'param6' : this.param7 ? 'param7' : 'param8',
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
