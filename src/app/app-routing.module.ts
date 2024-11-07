import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { LayoutComponent } from './layouts/layout.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard]  },
  { path: 'auth', component: AuthlayoutComponent, loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'camaras', component: LayoutComponent, loadChildren: () => import('./modules/cameras/cameras.module').then(m => m.CamerasModule) },
  { path: 'campos', component: LayoutComponent, loadChildren: () => import('./modules/courts/courts.module').then(m => m.CourtsModule) },
  { path: 'videos', component: LayoutComponent, loadChildren: () => import('./modules/videos/videos.module').then(m => m.VideosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }