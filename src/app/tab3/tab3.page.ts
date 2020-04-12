import { Component,ElementRef,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { ImagePage } from './../image/image.page';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  styles:[`host: { 'style':'line-height: 0'}`]
})
export class Tab3Page {
 tw: String;
name: String;
 url: String;
prevurl: String;
  constructor(public mc:ModalController,public ac: AlertController,private as:ActionSheetController,private storage: Storage, public toastController: ToastController) { }
  async ionViewWillEnter() {
    console.log('ivl');
    this.setval();
  }
  async openimg() {
    const modal = await this.mc.create({
      component: ImagePage
    });
    await modal.present();
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if (data.data) {
          const repdata = data.data.replace('[pic]:','')
          this.url = repdata;
          this.prevurl = repdata;
        } else {
          console.log('empty image');
        }
      });
  }
  async inputalert() {
    const alert = await this.ac.create({
      header: '画像のURLを入力',
      inputs: [
        {
          name: 'url',
          type: 'url',
          placeholder: 'ここに入力...'
        }
      ],
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'OK',
          handler: (data) => {
            console.log(data.url);
            this.url = data.url;
            this.prevurl = data.url;
          }
        }
      ]
    });
    await alert.present();
  }
  async openimgsheet() {
    const actionSheet = await this.as.create({
      header: '画像の設定方法を選択',
      buttons: [{
        text: '画像をアップロード',
        role: 'destructive',
        icon: 'cloud-upload-outline',
        handler: () => {
          this.openimg();
        }
      }, {
        text: '画像のURLを入力',
        icon: 'link-outline',
        handler: () => {
          this.inputalert();
        }
      }]
    });
    await actionSheet.present();
  }
  async setval() {
    await this.storage.get('name').then((val) => {
      console.log('Yourname is', val);
      this.name = val;
    });
    await this.storage.get('url').then((val) => {
      console.log('Your url is', val);
      this.url = val;
      this.prevurl = val;
    });
    await this.storage.get('tw').then((val) => {
      console.log('Your twitterID is', val);
      this.tw = val;
    });
  }
async send(){
  console.log(this.tw);
  if (this.tw) {
    await this.storage.set('tw', this.tw);
    if (this.name && this.name.length < 20) {
      await this.storage.set('name', this.name);
        await this.storage.set('url', this.url);
        this.tst('プロフィールを更新しました。');
    } else {
      this.tst('名前が空白か20文字を超えています。');
    }
  } else {
    this.tst('twitter IDが入力されていません。');
  }
}
  async tst(hd) {
    this.setval();
    const toast = await this.toastController.create({
      header: hd,
      message: '',
      duration: 1400,
      position: 'bottom',
      buttons: [
        {
          text: '閉じる',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
