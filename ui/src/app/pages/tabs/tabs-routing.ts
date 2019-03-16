import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
 
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full',},
      { 
        path: 'home',
        children: [
          {path: '', loadChildren: '../home/home.module#HomePageModule'},
          { path: 'seat-selection/:route/:busNumber', loadChildren: '../seat-selection/seat-selection.module#SeatSelectionPageModule' },
          { path: 'seats/:route/:busNumber/:boardingPoint/:droppingPoint', loadChildren: '../seats/seats.module#SeatsPageModule' }
        ]
      },
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
