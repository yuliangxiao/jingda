class ShowToast {
    constructor(public toastCtrl) {

    }
    presentToast(msg: string, time: number = 1000) {
        const toast = this.toastCtrl.create({
            message: msg,
            duration: time
        });
        toast.present();
    }
}
class ShowActionSheet {
    constructor(public actionSheetCtrl) {

    }
    presentActionSheet(title: string, btn_list: Array<string>, callBack: any) {
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
class Confirm {
    constructor(public alertCtrl) {

    }
    showConfirm(title: string = '提示框', msg: string = '是否提交', callBack: any) {
        const prompt = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
                {
                    text: '取消',
                    handler: data => {
                        callBack(false);
                    }
                },
                {
                    text: '确定',
                    handler: data => {
                        callBack(true);
                    }
                }
            ]
        });
        prompt.present();
    }
}
class Loading {
    private loadinger: any;
    constructor(public loadingCtrl) {

    }
    loading(content: string = '请等待') {
        this.loadinger = this.loadingCtrl.create({
            content: content
        });
        this.loadinger.present();
    }
    dismiss() {
        this.loadinger.dismiss();
    }

}
export { ShowToast, ShowActionSheet, Loading, Confirm}