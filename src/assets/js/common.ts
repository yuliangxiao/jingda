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
export { ShowToast, ShowActionSheet }