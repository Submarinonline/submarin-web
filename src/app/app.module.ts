import { OptionComponent } from './option/option.component';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { PubNubAngular } from 'pubnub-angular2';
import { IonicModule, IonicRouteStrategy,Platform ,NavParams} from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Push } from '@ionic-native/push/ngx';
import { AngularFireModule } from '@angular/fire';
import { FormsModule }   from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
@NgModule({
  declarations: [AppComponent,OptionComponent],
  entryComponents: [],
  exports:[HttpClientModule],
  imports: [BrowserAnimationsModule,BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), FormsModule, AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [NavParams,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },PubNubAngular,AngularFireDatabase,Push],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
