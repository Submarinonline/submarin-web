import { Component, OnInit,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent {
  @ViewChild('inpt') in: any;
  constructor(private toastController:ToastController,private storage:Storage) { }
  
  async ionViewWillEnter() {
    await this.storage.get('mute').then((val) => {
      console.log('muteword is', val);
      console.log(this.in);
      this.in.value = val;
    });
  }
  async send() {
    await console.log(this.in);
    await this.storage.set('mute', this.in.value);
    const toast = await this.toastController.create({
      header: 'ミュートワードが設定されました。',
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
