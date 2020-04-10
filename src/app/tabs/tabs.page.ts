import { Component,HostBinding,ElementRef,Renderer2 } from '@angular/core';
import { Router,ActivatedRoute,Routes,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  ifhide: boolean;
  style: any;
 
  constructor(private renderer: Renderer2,private elementRef: ElementRef,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params["app"]) {
        console.log('fromapp!');
        this.ifhide = true;
        this.elementRef.nativeElement.querySelector('ion-tab-bar').style.display = "none";
      }});
  }

}
