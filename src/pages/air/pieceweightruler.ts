import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { server } from '../../assets/js/server_path'
import { CommonProvider } from '../../providers/common/common';
import { Loading, Toast } from '../../providers/tips/tips';
@Component({
    selector: 'page-pieceweightruler',
    templateUrl: 'pieceweightruler.html'
})

export class Pieceweightruler {
    private items: ItemsModel;
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private httpReq: CommonProvider, private loading: Loading, private toast: Toast) {
        this.items = this.navParams.get('items');
    }
    sure() {
        this.loading.show();
        this.httpReq.post(server + 'ChangeTAirBLGoodsList', this.items).then((res) => {
            this.toast.show("成功");
            this.loading.dismiss();
        });
    }
}
class ItemsModel {
    CompID: string;
    GoodsID: number;
    BLID: number;
    GoodsType: number;
    Qty: number;
    GrossWeight: number;
    Volume: number;
    Length: number;
    Width: number;
    Height: number;
}