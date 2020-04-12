import { OptionComponent } from './../option/option.component';
import { Component, OnInit,ViewChild, HostListener} from '@angular/core';
import { Routes, NavigationExtras,ActivatedRoute, Router } from '@angular/router';
import {PubNubAngular} from 'pubnub-angular2';
import { Storage } from '@ionic/storage';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PopoverController,AlertController,ActionSheetController,ToastController,ModalController } from '@ionic/angular';
import { GifPage } from './../gif/gif.page';
import { YoutubePage } from './../youtube/youtube.page';
import { ImagePage } from './../image/image.page';
declare var $;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage {
  roomname:any;
  pn:any;
  ytloading: boolean;
  title: any;
  imgas: any;
  cjp: any;
  enter: boolean;
  nr: any;
  device: any;
  v: any;
  mute: any;
  notifysound: any;
  name: any;
  img: any;
  inputv: String;
  url: any;
  headers: any;
  tw: any;
  kdict: any;
  imgfile: any;
  talkarray: any;
  pubnub: typeof PubNubAngular;
  @ViewChild('content') content: any;
  @ViewChild('messages') messages: any;
  @ViewChild('talklist') talklist: any;
  constructor(private sanitizer: DomSanitizer,private push: Push,public as:ActionSheetController,public ac: AlertController,public modalController: ModalController,public popoverController: PopoverController,private http: HttpClient,public toastController:ToastController,public storage:Storage,private route: ActivatedRoute, private router: Router,pubnub: PubNubAngular) {
    this.kdict = require('./../../hidefile.json');
    this.v = this.kdict["Version"];
    const pn = pubnub.init({
    publishKey: this.kdict["pnp"],
      subscribeKey: this.kdict["pns"]
    });
    document.addEventListener('keydown', this.one.bind(this),false);
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
  async openimg() {
    const modal = await this.modalController.create({
      component: ImagePage
    });
    modal.onDidDismiss()
    .then((data) => {
      console.log(data);
      if(data.data){
        this.sendmsg(data.data);
      } else {
        console.log('empty image');
      }
    });

    return await modal.present();
  }
  async one(e) {
    if (e["keyCode"] == 13) {
      this.enter = true;
      setTimeout(this.ef,300);
    } else if (e["keyCode"] == 17) {
      if(this.enter){
        console.log('send!');
        await this.send();
      }
    }
    console.log(e);
  }
  ef() {
    this.enter = false;
  }
  async setimgas(){
  

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
      const res = await this.http.get(this.kdict["ipinfo"])
      .subscribe(res => {
        console.log(res);
        this.device = res;
      }, error => {
        this.device = false;
      });
    }
    send2(value){
      const sendarray = [];
      sendarray.push(this.kdict["log"]);
      sendarray.push(value);
      sendarray.push(this.url);
      sendarray.push('<b>Submarin</b> Web ' + this.v);
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
      sendarray.push('<b>Submarin</b> Web ' + this.v);
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
        duration: 2000,
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
        this.title = this.roomname;
      }
      if(!this.url|| this.url === ' '|| this.url === '　'||this.url === ''){
        this.url = 'https://山d.com/storage/wei_san/.submarin_files/b7ea3.png';
      }
      console.log(this.url);
      if(this.url == 'hisubway.png'){
        this.url = 'https://pbs.twimg.com/profile_images/1245034931652194304/m3R_RlrO_400x400.jpg';
      }
      if (!this.name || this.name === ' ' || this.name === '　' || this.name === '' || this.name === null) {
        this.router.navigate(['tabs/profile']);
        this.toastV('プロフィールが設定されていません。プロフィールを設定してください。','閉じる');
      }
    }
  async menu() {
    const actionSheet = await this.as.create({
      header: 'メニュー',
      buttons: [
       /* {
        text: '動画を送信',
        role: 'destructive',
        icon: 'videocam',
        handler: () => {
          console.log('movie clicked');
        }
      },*/ {
        text: 'Youtubeを送信',
        icon: 'logo-youtube',
        handler: () => {
          console.log('YT clicked');
          this.ytopen();
        }
      }, {
        text: 'GIFを送信',
        icon: 'shapes',
        handler: () => {
          console.log('GIF clicked');
          this.GIF();
        }
      }, {
        text: '閉じる',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
    }
    async sbottom() {
      console.log('scroll bottom');
      await this.content.scrollToBottom(200);
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
      if (stringmessage.includes('<font color=#FFFFAA>')) {
        console.log('入室');
        this.nr = arymsg[1].replace('<font color=#FFFFAA>●</font>', '');
      } else {
        console.log('退室');
        this.nr = arymsg[1].replace('<font color=#CCCCCC>●</font>', '');
      }
      console.log(this.nr);
      viewary.push(this.nr)
      viewary.push('');
      viewary.push(arymsg[2]);
      this.talkarray.push(viewary);
      if (this.talkarray.length > 0){
       // this.sbottom();
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
        if (arymsg[1] === this.kdict["reload"]) {
          await this.forcereload(arymsg);
        } else {
          const me = this.checkme(arymsg);
          arymsg[10] = me;
          console.log("---");
          console.log(arymsg[10]);
          console.log(arymsg[0]);
          console.log(this.name);
          console.log("---");
          if(this.notifysound){
            await this.Sound.play();
          }
          if (this.cjp) {
            arymsg[1] = await this.correctjp(va);
            console.log(arymsg[1]);
          }
          if(msg.includes('[online]:')) {
            console.log('online' + va);
          }else if (msg.includes(this.kdict["log"])) {
            await this.outin(va,arymsg);
          } else {
            if (va.includes('[yt]:')) {
              await this.yt(va, arymsg);
            } else if (va.includes('[pic]:')) {
              await this.inpic(va, arymsg);
            } else {
              this.talkarray.push(arymsg);
              console.log(this.talkarray);
            }
          }
        }
      } else {
        console.log('this message is muted.')
      }
    }
    checkme(arymsg) {
      if (arymsg[0] === this.name) {
        return true;
      } else {
        return false;
      }
    }
  
async inpic(va,arymsg) {
      console.log('画像');
      var url = va.replace('[pic]:', '');
      arymsg[1] = false;
      arymsg[9] = url;
      this.talkarray.push(arymsg);
  }
  async yt(va, arymsg) {
      console.log('youtube');
      var url = va.replace('[yt]:', '');
     arymsg[1] = false;
    arymsg[11] = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + url);
     this.ytloading = true;
      this.talkarray.push(arymsg);
  }
  async ytl(){
    this.ytloading = false;
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
      const firstmessage = '<font color=#FFFFAA>●</font>　' + this.name + 'が参加しました (Web)';
      this.send2(firstmessage);
      this.pn.getMessage(this.roomname, async(msg) => {
        this.getmessageset();
        var rep = msg.message.replace(/\+/g, ' ');
        console.log(rep);
        var arymsg = rep.split('|||||');
        const va = String(arymsg[1]);
        await this.chkmute(va,rep,arymsg);
        await this.sbottom();
        
      });
    }
    
    async ytopen() {
      const modal = await this.modalController.create({
        component: YoutubePage
      });
      modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if(data.data){
          this.sendmsg('[yt]:' + data.data);
        } else {
          console.log('empty yt');
        }
      });
      return await modal.present();
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
          console.log('empty gif');
        }
      });
      return await modal.present();
    }
    
    async ionViewWillLeave(){
      const firstmessage = '<font color=#CCCCCC>●</font>　' + this.name + 'が退出しました (Web)';
      this.send2(firstmessage);
      this.pn.clean(this.roomname);
      this.talkarray = false;
      this.pn.release(this.roomname);
      this.pn.unsubscribe({
        channels  : [this.roomname]
      });
    }
  }
  
  