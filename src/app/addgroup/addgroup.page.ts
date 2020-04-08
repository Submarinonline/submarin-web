import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ElementArrayFinder } from 'protractor';
import { BrowserTransferStateModule } from '@angular/platform-browser';
@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.page.html',
  styleUrls: ['./addgroup.page.scss'],
})
export class AddgroupPage implements OnInit {
  pass: any;
  name: String;
  room: any;
  passtoggle: any;
  constructor(private tc: ToastController,private db:AngularFireDatabase) { }
  async message(tf) {
    var tx;
    if (tf) {
      tx = 'グループを作成しました。'
    } else {
      tx = 'グループの作成に失敗しました。'
    }
    const toast = await this.tc.create({
      message: tx,
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
    this.room = this.db.list('room');
  }
  send() {
    console.log(this.name + this.pass);
    if (this.pass) {
      console.log('locked room');
      this.set(this.pass);
    } else {
      this.set(false);
    }
  }
  set(pass) {
    try {
      const data = {
        "name": this.name,
        "key": pass
      }
      this.room.push(data);
      this.message(true);
    } catch {
      this.message(false);
    }
  }
}
