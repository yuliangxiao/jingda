import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { server } from '../../assets/js/server_path'
import { CommonProvider } from '../../providers/common/common';
import { ActionSheet, Loading, Confirm, Toast } from '../../providers/tips/tips'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Pieceweightruler } from './pieceweightruler'
import { CacheKeys, CacheProvider } from '../../providers/cache/cache'
import { Storage } from '@ionic/storage';


/**
 * Generated class for the AirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-air',
  templateUrl: 'air.html',
})


export class AirPage {
  private items: any;
  private username = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpReq: CommonProvider,
    private actionSheet: ActionSheet,
    private loading: Loading,
    private alertCtrl: AlertController,
    private camera: Camera,
    private comfirm: Confirm,
    private toast: Toast,
    private cache: CacheProvider,
    public storage: Storage) {
    this.storage.get('username').then((val) => {
      this.username = val;
    });
    //this.username = cache.GetStorageInfo(CacheKeys.username);
  }
  ionViewDidLoad() {
    this.request_url();
  }
  request_url() {
    this.httpReq.get(server + 'GetAirList').then((res) => {
      this.items = res;
    });
  }
  pressEvent(BLID: number) {
    let btn_arr = ['计划完成', '已收货', '已放行', '交接主单和随机文件', '补全件重尺', '报告异常'];
    this.actionSheet.show('选择操作', btn_arr, (res) => {
      // this.loading.show();
      switch (res) {
        case '计划完成':
          this.Change_Status(BLID, 2, '计划完成');
          break;
        case '已收货':
          this.Change_Status(BLID, 3, '已收货');
          break;
        case '已放行':
          this.Change_Status(BLID, 4, '已放行');
          break;
        case '交接主单和随机文件':
          this.Change_Status(BLID, 6, '交接主单和随机文件');
          break;
        case '补全件重尺':
          this.EntryInput(BLID);
          break;
        case '报告异常':
          this.openCamera(BLID);
          break;
      }
    });
  }
  EntryInput(BLID: number) {
    this.httpReq.get(server + 'GetTAirBLGoodsList?BLID=' + BLID).then((res) => {
      this.navCtrl.push(Pieceweightruler, { items: res });
    });


    // const prompt = this.alertCtrl.create({
    //   title: '录入信息',
    //   message: "请录入件重尺信息",
    //   inputs: [
    //     {
    //       name: 'Pkgs',
    //       placeholder: '件数'
    //     },
    //     {
    //       name: 'GrossWeight',
    //       placeholder: '重量'
    //     },
    //     {
    //       name: 'Volume',
    //       placeholder: '尺码'
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: '取消',
    //       handler: data => {
    //       }
    //     },
    //     {
    //       text: '保存',
    //       handler: data => {
    //         this.loading.show();
    //         this.httpReq.post(server + 'EntryInput', Object.assign(data, {
    //           BLID: BLID
    //         })).then((res) => {
    //           this.loading.dismiss();
    //           this.toast.show('保存成功');
    //         }).catch((reserr) => {
    //           this.loading.dismiss();
    //           this.toast.show('保存失败');
    //         });
    //       }
    //     }
    //   ]
    // });
    // prompt.present();
  }
  openCamera(BLID: number) {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.Sub_Abnormal(base64Image, BLID);
    }, (err) => {

    });
  }
  Sub_Abnormal(img: string, BLID: number) {
    const prompt = this.alertCtrl.create({
      title: '备注',
      message: "请填写备注信息",
      inputs: [
        {
          name: 'Remark',
          placeholder: '备注'
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '提交',
          handler: data => {
            this.loading.show();
            this.httpReq.post(server + 'Sub_Abnormal', Object.assign(data, {
              BLID: BLID,
              Img: img
            })).then((res) => {
              this.loading.dismiss();
              this.toast.show('提交成功');
            }).catch((reserr) => {
              this.loading.dismiss();
              this.toast.show('提交失败');
            });
          }
        }
      ]
    });
    prompt.present();
  }
  Change_Status(BLID: number, Status: number, Status_Str: string) {
    this.comfirm.showConfirm('提示信息', '确认将单子状态更改为' + Status_Str + '?', (bl: boolean) => {
      if (bl) {
        this.loading.show();
        this.httpReq.post(server + 'Change_TAir_Status', {
          BLID: BLID,
          Status: Status,
          Status_Str: Status_Str,
          UserName: this.username
        }).then((res) => {
          this.loading.dismiss();
          this.toast.show('更改成功');
        }).catch((reserr) => {
          this.loading.dismiss();
          this.toast.show('更改失败');
        });
      }
    });
  }
}
