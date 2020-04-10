import { Component,ViewChild } from '@angular/core';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('inp')inp:any;
  room: any;
  first: any;
  url: string;
  name: string;
  setcheck: boolean;
  twitter: string;
  constructor(private route:ActivatedRoute,private storage:Storage,private alert:AlertController,private db:AngularFireDatabase,private router: Router, private toastController: ToastController) {
    this.route.queryParams.subscribe(params => {
      this.url = params["url"];
      this.name = params["name"];
      this.twitter = params["id"];
    });
  }
  ionViewWillEnter() {
    console.log('iv');
    this.setprofbyapp();
    this.db.list('room').valueChanges().subscribe(data => {
      this.room = data;
      this.first = data;
      this.room.reverse();
      this.first.reverse();
    });
    /*this.room = [
      { "name": "テストグループ1", "key": false },
      { "name": "テストグループ2", "key": true },
      { "name": "テストグループ3", "key": true },
      { "name": "テストグループ4", "key": false },
      { "name": "テストグループ5", "key": true }
    ];*/
  }
  async go(val,name) {
    if (val) {
      const alert = await this.alert.create({
        header: 'パスワードを入力',
        message: 'このグループにはパスワードが設定されています。パスワードを入力してください。',
        inputs: [
          {
            name: 'pass',
            type: 'text',
            placeholder: 'ここに入力...'
          }
        ],
        buttons: ['キャンセル',
          {
            text: 'OK',
            handler: (alertData) => {
              if (alertData.pass === val) {
                let nav: NavigationExtras = {
                  state: {
                    inner: name
                  }
                 };
                 this.router.navigate(['chat'],nav);
              } else {
                this.badpassword();
              }
            }
          }]
      });
  
      await alert.present();
    } else {
      this.gosend(name);
    }
  }
  async setprofbyapp() {
    if (this.name) {
      await this.storage.set('name', this.name);
      this.setcheck = true;
    } if (this.url) {
      await this.storage.set('url', this.url);
      this.setcheck = true;
    }if (this.twitter){
        await this.storage.set('tw', this.twitter);
        this.setcheck = true;
    }
    const ts = await this.toastController.create({
      header: 'アプリとプロフィールが同期されました。',
      message: '',
      position: 'bottom',
      duration:3000,
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
      
    if (this.setcheck) {
        ts.present();
      }
  }
  async search(ev) {
      const toast = await this.toastController.create({
        message: '現在検索は利用できません。',
        duration: 2000
      });
      toast.present();
  }
  async badpassword() {
    const toast = await this.toastController.create({
      message: 'パスワードが違います。',
      duration: 2000
    });
    toast.present();
  }
  gosend(inpt) {
    
      let nav: NavigationExtras = {
        state: {
          inner: inpt
        }
       };
       this.router.navigate(['chat'],nav);

  }
  add() {
    this.router.navigate(['addgroup']);
  }
  async showmsg() {
    const toast = await this.toastController.create({
      header: '英数字のみ入力可能です。',
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
