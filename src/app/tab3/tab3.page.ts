import { Component,ElementRef,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('tw') tw: any;
  @ViewChild('name') name: any;
  @ViewChild('url') url:any;
  constructor(private storage: Storage, public toastController: ToastController) { }
  async ionViewWillEnter() {
    console.log('ivl');
    this.setval();
  }
  async setval() {
    await this.storage.get('name').then((val) => {
      console.log('Yourname is', val);
      this.name.value = val;
    });
    await this.storage.get('url').then((val) => {
      console.log('Your url is', val);
      this.url.value = val;
    });
    await this.storage.get('tw').then((val) => {
      console.log('Your twitterID is', val);
      this.tw.value = val;
    });
  }
async send(){
  console.log(this.tw);
  console.log(this.tw.value);
  if (this.tw.value) {
    await this.storage.set('tw', this.tw.value);
    if (this.name.value && this.name.value.length < 20) {
      await this.storage.set('name', this.name.value);
        await this.storage.set('url', this.url.value);
        this.success();
    } else {
      const toast = await this.toastController.create({
        header: '名前が空白か20文字を超えています。',
        message: '',
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
  } else {
    const toast = await this.toastController.create({
      header: 'TwitterIDが未入力です。',
      message: '',
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
  async success() {
    this.setval();
    const toast = await this.toastController.create({
      header: 'プロフィールを更新しました。',
      message: '',
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
