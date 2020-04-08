import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'mute',
    loadChildren: () => import('./mute/mute.module').then( m => m.MutePageModule)
  },
  {
    path: 'image',
    loadChildren: () => import('./image/image.module').then( m => m.ImagePageModule)
  },
  {
    path: 'addgroup',
    loadChildren: () => import('./addgroup/addgroup.module').then( m => m.AddgroupPageModule)
  },
  {
    path: 'gif',
    loadChildren: () => import('./gif/gif.module').then( m => m.GifPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
