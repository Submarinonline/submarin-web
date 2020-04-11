import { Component } from '@angular/core';
import { ActionSheetController,ToastController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { Storage } from '@ionic/storage';
import { Router,ActivatedRoute,Routes,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  url: string;
  name: string;
  kdict: any;
  v: string;
  setcheck: boolean;
  twitter: string;
  constructor(public toast: ToastController, private storage: Storage, private route: ActivatedRoute, private router: Router, public photoService: PhotoService, public actionSheetController: ActionSheetController) {
    this.route.queryParams.subscribe(params => {
      this.url = params["url"];
      this.name = params["name"];
      this.twitter = params["id"];
    });
    this.kdict = require('./../../hidefile.json');
  }

  ngOnInit() {
    this.photoService.loadSaved();
    this.setprofbyapp();
    this.v = this.kdict["Version"];
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
    const ts = await this.toast.create({
      header: 'アプリとプロフィールが同期されました。',
      message: '',
      position: 'bottom',
      duration:1300,
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
gochat(){
  let nav: NavigationExtras = {
    state: {
      inner: 'chat'
     }
   };
   this.router.navigate(['chat'],nav);
}
  async showActionSheet(photo, position) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }
}
