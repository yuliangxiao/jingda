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

export { ShowToast }