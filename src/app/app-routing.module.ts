import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'pin', loadChildren: './pin/pin.module#PinPageModule' },
  { path: 'retirements', loadChildren: './retirements/retirements.module#RetirementsPageModule' },
  { path: 'retirements/:id', loadChildren: './retirement/retirement.module#RetirementPageModule' },
  { path: 'retirements/:id/:subscription', loadChildren: './subscription/subscription.module#SubscriptionPageModule' },
  { path: 'users', loadChildren: './users/users.module#UsersPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
