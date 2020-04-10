import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.page.html',
  styleUrls: ['./youtube.page.scss'],
})
export class YoutubePage implements OnInit {
  ytr: any;
  loader: boolean;
  first: boolean;
  kdict: any;
  constructor(public mc: ModalController, public http: HttpClient) {
    this.kdict = require('./../../hidefile.json');
  }
  inpt: String;
  ngOnInit() {
  }
  close(){
    this.mc.dismiss();
  }
  open(id) {
    console.log(id);
    this.mc.dismiss(id);
  }
  go(val) {
    this.first= true;
    this.loader = true;
    if (val) {
      this.http.get(' https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&safeSearch=none&key='+this.kdict["youtube"]+'&maxResults=25&q=' + val.target.value).subscribe(res => {
        console.log(res);
        this.ytr = res["items"];
        this.loader = false;
      });
    } else {
      this.http.get(' https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&safeSearch=none&key='+this.kdict["youtube"]+'&maxResults=25&q=' + this.inpt).subscribe(res => {
        console.log(res);
        this.ytr = res["items"];
        this.loader = false;
      });
    }
  }
}
