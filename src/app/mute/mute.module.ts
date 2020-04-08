import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MutePageRoutingModule } from './mute-routing.module';

import { MutePage } from './mute.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MutePageRoutingModule
  ],
  declarations: [MutePage]
})
export class MutePageModule {}
