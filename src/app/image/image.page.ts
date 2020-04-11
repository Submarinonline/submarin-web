import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
declare var $;
@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage{
  fload: any;
  
  constructor(private mc: ModalController) {
    window.addEventListener("message", data => {
      console.log(data.data);
      this.mc.dismiss(data.data);
          });
  }  
  close(){
    this.mc.dismiss();
  }
finishload(){
this.fload = true;
}
}
