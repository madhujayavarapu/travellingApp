import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register/:username', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'verify-otp', loadChildren: './pages/verify-otp/verify-otp.module#VerifyOtpPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'payment/:route/:busNumber/:boardingPoint/:droppingPoint/:totalPrice/:seatsCount', loadChildren: './pages/payment/payment.module#PaymentPageModule' }

  // { path: 'modal-page', loadChildren: './pages/modal-page/modal-page.module#ModalPagePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
