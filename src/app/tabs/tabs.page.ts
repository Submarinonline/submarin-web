import { AlertController,ToastController} from '@ionic/angular';
import { Component,HostBinding,ElementRef,Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Routes, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Version } from '@angular/compiler';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  ifhide: boolean;
  style: any;
  kdict: Object;
  version: any;
  tst: any;
  constructor(private tc:ToastController,private alert:AlertController,private storage:Storage,private db:AngularFireDatabase,private renderer: Renderer2,private elementRef: ElementRef,private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      if (params["app"]) {
        console.log('fromapp!');
        this.ifhide = true;
        this.elementRef.nativeElement.querySelector('ion-tab-bar').style.display = "none";
      }
    });
    this.ct();
    this.kdict = require('./../../hidefile.json');
    this.versioncheck();
  }
  async ct() {
    this.tst = await this.tc.create({
      message: '更新を確認中...',
      position: 'top'
    });
    this.tst.present();
  }
  async versioncheck() {
    this.db.object('Version').valueChanges().subscribe(data => {
      this.version = data["version"];
      console.log(this.version + this.kdict["Version"]);
      this.tst.dismiss();
      if (Number(this.version) > Number(this.kdict["Version"])) {
        this.updatedialog();
      } else if (Number(this.version) < Number(this.kdict["Version"])) {
        this.firstdialog();
      } else if(Number(this.version) == Number(this.kdict["Version"])){
        console.log('最新バージョンを使用しています。');
      }
    });
  }
  async updatedialog() {
    const alert = await this.alert.create({
      header: '旧バージョンを使用しています。',
      message: '旧バージョンのSubmarinが読み込まれています。機能の追加やバグの修正がされていない可能性があるため、リロードして更新することを推奨します。',
      buttons: [
        {
          text: '無視',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'リロード',
          handler: () => {
            console.log('Confirm Okay');
            window.location.reload(true);
          }
        }
      ]
    });

    await alert.present();
 }
 async firstdialog() {
  const alert = await this.alert.create({
    header: '未公開のバージョンを使用しています。',
    message: '未公開のSubmarinが読み込まれています。動作が安定しない可能性があるため、開発者でない場合はリロードして更新することを推奨します。',
    buttons: [
      {
        text: '無視',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'リロード',
        handler: () => {
          console.log('Confirm Okay');
          window.location.reload(true);
        }
      }
    ]
  });

  await alert.present();
}
}
