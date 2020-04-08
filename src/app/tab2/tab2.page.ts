import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor( private router: Router,public photoService: PhotoService, public actionSheetController: ActionSheetController) {}

  ngOnInit() {
    this.photoService.loadSaved();
  }
gochat(){
  let nav: NavigationExtras = {
    state: {
      inner: 'chat'
     }
   };
   this.router.navigate(['chat'],nav);
}
  public async showActionSheet(photo, position) {
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
