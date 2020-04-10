import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubePage } from './youtube.page';

const routes: Routes = [
  {
    path: '',
    component: YoutubePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubePageRoutingModule {}
