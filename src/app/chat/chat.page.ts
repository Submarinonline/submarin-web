import { OptionComponent } from './../option/option.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Routes, NavigationExtras,ActivatedRoute, Router } from '@angular/router';
import {PubNubAngular} from 'pubnub-angular2';
import { Storage } from '@ionic/storage';
//import { Hidefile } from '../hidefile.json';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { GifPage } from './../gif/gif.page';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
declare var $;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage {
  roomname:any;
  pn:any;
  title: any;
  imgas: any;
  cjp: any;
  nr: any;
  device: any;
  mute: any;
  notifysound: any;
  name: any;
  img: any;
  inputv: String;
  url: any;
  headers: any;
  tw: any;
  imgfile: any;
  talkarray: any;
  pubnub: typeof PubNubAngular;
  @ViewChild('content') content: any;
  @ViewChild('messages') messages: any;
  @ViewChild('talklist') talklist: any;

  constructor(public as:ActionSheetController,public ac: AlertController,public modalController: ModalController,public popoverController: PopoverController,private http: HttpClient,public toastController:ToastController,public storage:Storage,private route: ActivatedRoute, private router: Router,pubnub: PubNubAngular) {
    //console.log(Hidefile.pnp);
    const pn = pubnub.init({
      publishKey: 'pub-c-0ec79073-8a0b-437f-a597-d25dbf991628',
      subscribeKey: 'sub-c-387fb044-4da6-11ea-814d-0ecb550e9de2'
    });
    this.pn = pn;
    this.route.queryParams.subscribe(params => {
      try {
        if (this.router.getCurrentNavigation().extras.state.inner) {
          this.roomname = this.router.getCurrentNavigation().extras.state.inner;
          console.log(this.roomname);
        } else {
          console.log("dont recived");
          this.router.navigate(['tabs']);
        }
      } catch {
        this.router.navigate(['tabs']);
      }
    });
  }
  private Sound: HTMLAudioElement = new Audio('./assets/pito.mp3');
  async correctjp(value) {
    return value;
  }

  async setimgas(){
    this.imgas = await this.as.create({
      header: '画像の操作を選択',
      buttons: [{
        text: '画像をトリミング',
        // role: 'destructive',
        icon: 'crop',
        handler: () => {
          console.log('Delete clicked');
          console.log(this.imgfile);
        }
      }, {
        text: '画像をこのまま使用する',
        icon: 'image',
        handler: () => {
          console.log('Share clicked');
          console.log(this.imgfile);
          let data = new FormData();
          const image = this.imgfile.target.files[0];
          data.append('upfile', this.imgfile);
          data.append('p', "subway_3");
          this.http.post('https://山D.com/upload/.submarin/uploadNM.php', data,this.headers)
            .subscribe(
              data => console.log(data),
              error => console.log(error)
            );
          }
        }]
      });
  }
  async openmenu(ev: any) {
    console.log('open');
    const popover = await this.popoverController.create({
      component: OptionComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  async getip(){
    //https://ipinfo.io//json?token=d1a2bcc95e47c0
    const res = await this.http.get("https://ipinfo.io/json?token=d1a2bcc95e47c0")
    .subscribe(res => {
      console.log(res);
      this.device = res;
    }, error => {
      this.device = false;
    });
  }
  send2(value){
    const sendarray = [];
    sendarray.push('kzibgkidnmdbrtxwhzace');
    sendarray.push(value);
    sendarray.push(this.url);
    sendarray.push('<b>Submarin</b> Web 5.2');
    sendarray.push('810');
    sendarray.push(this.tw);
    sendarray.push('114514');
    sendarray.push(JSON.stringify(this.device));
    console.log(sendarray);
    const senddata = sendarray.join("|||||");
    this.pn.publish({ channel: this.roomname, message: senddata}, (response) => {
      console.log(response);
    });
  }
  
  async send(){
    const val = this.inputv;
    const chk = await this.checktext(val);
    if(chk){
      this.sendmsg(val);
    } else {
     console.log('送信失敗');
    }
  }
  async sendmsg(val) {
    const sendarray = [];
    sendarray.push(this.name);
    sendarray.push(val);
    sendarray.push(this.url);
    sendarray.push('<b>Submarin</b> Web 5.2');
    sendarray.push('810');
    sendarray.push(this.tw);
    sendarray.push('114514');
    sendarray.push(JSON.stringify(this.device));
    console.log(sendarray);
    const senddata = sendarray.join("|||||");
    this.pn.publish({ channel: this.roomname, message: senddata}, (response) => {});
    this.inputv = '';
  }
  async toastV(hd,tx){
    const toast = await this.toastController.create({
      header: hd,
      message: '',
      position: 'bottom',
      buttons: [
        {
          text: tx,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  
  
  async checktext(value) {
    const length = value.length;
      console.log(length);
    if (value.includes('おうおうおうお') || !value||value===' '||value==='　') {
      this.toastV('送受信できないメッセージです。','閉じる');
      return false;
    } else if (length > 301) {
      this.toastV('メッセージが300文字を超えています。','閉じる');
        return false;
      } else {
        return true;
      }
  }
  
  async setup(){
    await this.storage.get('name').then((val) => {
      console.log('Yourname is', val);
      this.name = val;
    });
    await this.storage.get('url').then((val) => {
      console.log('Your url is', val);
      this.url = val;
    });
    await this.storage.get('tw').then((val) => {
      console.log('Your twitterID is', val);
      this.tw = val;
    });
    await this.storage.get('mute').then((val) => {
      console.log('Your muteword is', val);
      this.mute = val;
    });
    if(this.roomname== 'chat'){
      this.title="オープンチャット";
    } else {
      //this.title=window.atob(this.roomname);
      this.title = this.roomname;
    }
    if(!this.url|| this.url === ' '|| this.url === '　'||this.url === ''){
      this.url = 'https://山d.com/storage/wei_san/.submarin_files/b7ea3.png';
    }
    if(this.url === 'hisubway.png'){
      this.url = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2FHiSubway%2Fstatus%2F1240129181930921988&psig=AOvVaw0wu1kej3--GQVe6Mh1fj1h&ust=1586266197919000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOijqp300-gCFQAAAAAdAAAAABAD';
    }
    if (!this.name || this.name === ' ' || this.name === '　' || this.name === '' || this.name === null) {
      this.router.navigate(['tabs/profile']);
    }
  }
  async sbottom() {
    this.content.scrollToBottom(400);
  }
  async getmessageset() {
    this.storage.get('notifysound').then((val) => {
      console.log('notifysound', val);
      console.log(this.notifysound);
      this.notifysound = val;
    });
    this.storage.get('correctjp').then((val) => {
      console.log('correctjp', val);
      this.cjp = val;
    });
  }
  async outin(stringmessage,arymsg) {
    console.log('入退室');
    console.log(arymsg);
    const viewary = [];
    if (stringmessage.includes('<font+color=#FFFFAA>')) {
      console.log('入室');
      this.nr = arymsg[1].replace('<font+color=#FFFFAA>●</font>', '');
    } else {
      console.log('退室');
      this.nr = arymsg[1].replace('<font+color=#CCCCCC>●</font>', '');
    }
    console.log(this.nr);
    viewary.push(this.nr)
    viewary.push('');
    viewary.push(arymsg[2]);
    this.talkarray.push(viewary);
    if (this.talkarray.length > 1){
      this.sbottom();
    }
  }
  async pnsubscribe() {
    this.pn.subscribe({
      channels  : [this.roomname],
      withPresence: true,
      triggerEvents: ['message'],
      presence: function(data) {
        console.log(data);
      }
    });
  }
  async forcereload(arymsg) {
    location.reload(true);
    arymsg[1] = 'Force reloading...';
    this.talkarray.push(arymsg);
  }
  async chkmute(va,msg,arymsg) {
    if (!va.includes(this.mute)) {
      if (arymsg[1] === '[[[:reload:]]]') {
        await this.forcereload(arymsg);
      } else {
        if(this.notifysound){
          await this.Sound.play();
        }
        if (this.cjp) {
          arymsg[1] = await this.correctjp(va);
          console.log(arymsg[1]);
        }
        if(msg.includes('[online]:')) {
          console.log('online' + va);
        }else if (msg.includes('kzibgkidnmdbrtxwhzace')) {
          await this.outin(va,arymsg);
        } else {
          if (va.includes('[pic]:')) {
            await this.inpic(va, arymsg);
          } else {
            const plusrp = msg.replace('+', ' ');
            var arymss = plusrp.split('|||||');
            this.talkarray.push(arymss);
            this.sbottom();
            console.log(this.talkarray);
          }
        }
      }
    } else {
      console.log('this message is muted.')
    }
  }

  async inpic(va,arymsg) {
    console.log('画像');
    var url = va.replace('[pic]:', '');
    arymsg[1] = false;
    arymsg[9] = url;
    this.talkarray.push(arymsg);
    this.sbottom();
  }
  async imgset() {
    await $('#imgs').on('change', (event) => {
      console.log(event);
    this.imgfile = event;
    console.log('img');
    this.imgas.present();
  });
  }
  async ionViewWillEnter() {
    this.Sound.load();
    this.setimgas();
    this.imgset();
    await this.getip();
    await this.setup();
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.talkarray = [];
    this.pnsubscribe();
    const firstmessage = '<font+color=#FFFFAA>●</font>　' + this.name + 'が参加しました (Web)';
    this.send2(firstmessage);
    this.pn.getMessage(this.roomname, (msg) => {
      this.getmessageset();
      var arymsg = msg.message.split('|||||');
      const va = String(arymsg[1]);
      this.chkmute(va,msg.message,arymsg);
      
    });
  }

  async GIF() {
    const modal = await this.modalController.create({
      component: GifPage
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if(data.data){
          this.sendmsg('[pic]:' + data.data);
        } else {
          console.log('empty img');
        }
    });
    return await modal.present();
  }

  async ionViewWillLeave(){
    const firstmessage = '<font+color=#CCCCCC>●</font>　' + this.name + 'が退出しました (Web)';
    this.send2(firstmessage);
    this.pn.clean(this.roomname);
    this.talkarray = false;
    this.pn.release(this.roomname);
    this.pn.unsubscribe({
      channels  : [this.roomname]
  });
  }
}

