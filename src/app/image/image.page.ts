import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
  fload: any;
  constructor(private mc:ModalController) { }
  ngOnInit() {
  }
  close(){
    this.mc.dismiss();
  }
finishload(){
this.fload = true;
}
}
