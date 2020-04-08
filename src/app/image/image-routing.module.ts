import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagePage } from './image.page';

const routes: Routes = [
  {
    path: '',
    component: ImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagePageRoutingModule {}
