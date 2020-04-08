import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MutePage } from './mute.page';

const routes: Routes = [
  {
    path: '',
    component: MutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MutePageRoutingModule {}
