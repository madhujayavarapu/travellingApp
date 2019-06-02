import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register/:username', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'verify-otp', loadChildren: './pages/verify-otp/verify-otp.module#VerifyOtpPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'seat-selection/:route/:busNumber', loadChildren: './pages/seat-selection/seat-selection.module#SeatSelectionPageModule', canActivate: [AuthGuard]},
  { path: 'seats/:route/:busNumber/:boardingPoint/:droppingPoint', loadChildren: './pages/seats/seats.module#SeatsPageModule', canActivate: [AuthGuard] },
  { path: 'payment/:route/:busNumber/:boardingPoint/:droppingPoint/:totalPrice/:seatsCount', loadChildren: './pages/payment/payment.module#PaymentPageModule', canActivate: [AuthGuard]},
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
