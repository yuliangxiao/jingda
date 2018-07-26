///<reference path="../../assets/js/jquery.d.ts"/>
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.params = this.navParams.get('title');
    this.init_html();
    this.blid = 0;
  }
  switchType() {
    this.http.request('http://127.0.0.1:8888/GetBLNo?id=' + this.typeTxt)
      .toPromise()
      .then(res => {
        this.input_txt = res.json()[0].BLNo;
        this.blid = res.json()[0].BLID;
      })
      .catch(err => { console.error(err) });
  }
 
  init_html() {
    // $(function () {
    //   // 允许上传的图片类型
    //   var allowTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    //   // 1024KB，也就是 1MB
    //   // 图片最大宽度
    //   var maxWidth = 1000;
    //   // 最大上传图片数量
    //   var maxCount = 30;
    //   $('#file').on('change', function (event) {
    //     var files = event.target.files;
    //     //console.log(files);return false;
    //     // 如果没有选中文件，直接返回
    //     if (files.length === 0) {
    //       return;
    //     }

    //     for (var i = 0, len = files.length; i < len; i++) {
    //       var file = files[i];
    //       var reader = new FileReader();

    //       // 如果类型不在允许的类型范围内
    //       if (allowTypes.indexOf(file.type) === -1) {

    //         $.alertTips("This type is not allowed to be uploaded！", "warning！");
    //         continue;
    //       }

    //       if ($('.Img_File_Item').length >= maxCount) {
    //         $.weui.alertTips({ text: 'This type does not allow the upload of ' + maxCount + 'images' });
    //         return;
    //       }
    //       reader.readAsDataURL(file);
    //       reader.onload = function (e) {
    //         //console.log(e);
    //         var img = new Image();
    //         img.src = e.target.result;
    //         img.onload = function () {
    //           // 不要超出最大宽度
    //           var w = Math.min(maxWidth, img.width);
    //           // 高度按比例计算
    //           var h = img.height * (w / img.width);
    //           var canvas = document.createElement('canvas');
    //           var ctx = canvas.getContext('2d');
    //           // 设置 canvas 的宽度和高度
    //           canvas.width = w;
    //           canvas.height = h;
    //           ctx.drawImage(img, 0, 0, w, h);
    //           var base64 = canvas.toDataURL('image/jpeg', 0.98);
    //           //console.log(base64);
    //           // 插入到预览区
    //           var $preview = $('<div class="img_item Img_File_Item"><img src="' + base64 + '"  /><span class="delete"></span></div>');
    //           if ($(".img_item").length > 3) {
    //             alert("超出最大上传图片数量!");
    //           }
    //           $('#img_list').prepend($preview);
    //         };
    //       };
    //     }
    //   });
    //   $('.Img_File').on("click", "span", function () {
    //     $(this).parents(".img_item").remove();
    //     //console.log('删除');
    //   });

    // });
  }
  select_img() {
    $("#file").click();
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
    if ($(".img_item").length == 0) {
      this.showAlert(1, "请选择图片!");
      return false;
    }
    let loading = this.loadingCtrl.create({
      content: '请等待'
    });
    loading.present();
    $(".img_item img").each((i, v) => {
      $.ajax({
        url: 'http://127.0.0.1:8888/InsertImg?id=' + this.blid,
        type: 'post',
        async: false,
        data: { img: $(v).attr('src') },
        success: function (data) {

        },
        error: function (data, status) {
          console.log("error");
        }
      });

    });
    loading.dismiss();
    this.showAlert(0, "保存成功!");
  }
}
