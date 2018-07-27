import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})

export class SearchPage {
    private param1: boolean = false;
    private param2: boolean = false;
    private param3: boolean = false;
    private param4: boolean = false;
    private param5: boolean = false;
    private param6: boolean = false;
    private param7: boolean = false;
    private param8: boolean = false;
    private param9: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    }
    dismiss() {
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }
    dismiss_no() {
        this.viewCtrl.dismiss('');
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
