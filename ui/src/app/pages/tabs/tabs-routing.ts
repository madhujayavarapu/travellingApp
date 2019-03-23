import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
 
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full',},
      { path: 'home', loadChildren: '../home/home.module#HomePageModule'},
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
      { path: 'tickets', loadChildren: '../tickets/tickets.module#TicketsPageModule' }
    ]
  }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
