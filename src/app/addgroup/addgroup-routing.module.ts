import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddgroupPage } from './addgroup.page';

const routes: Routes = [
  {
    path: '',
    component: AddgroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddgroupPageRoutingModule {}
