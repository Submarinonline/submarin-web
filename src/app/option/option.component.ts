import { Component, OnInit,ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController,PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent {
  @ViewChild('inpt') in: any;
  notifytoggle: any;
  jptoggle: any;
  sleep: any;
  constructor(private po:PopoverController,private toastController:ToastController,private storage:Storage) { }
  
  async ionViewWillEnter() {
    this.sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
    await this.storage.get('mute').then((val) => {
      console.log('muteword is', val);
      console.log(this.in);
      this.in.value = val;
    });
    await this.storage.get('correctjp').then((val) => {
      console.log('correctjp', val);
      this.jptoggle = val;
    });
    await this.storage.get('notifysound').then((val) => {
      console.log('notifysound', val);
      this.notifytoggle = val;
    });
  }
  async NS() {
    var st;
    if (this.notifytoggle) {
      st = false;
    } else {
      st = true;
    }
    this.sleep(300);
    console.log(st);
    await this.storage.set('notifysound', st);
  }
  async showusr() {
    this.po.dismiss('showuser');
  }
  async CJ() {
    var st;
    if (this.jptoggle) {
      st = false;
    } else {
      st = true;
    }
    this.sleep(300);
    console.log(st);
    await this.storage.set('correctjp', st);
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
