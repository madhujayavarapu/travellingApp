import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register/:username', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'verify-otp', loadChildren: './pages/verify-otp/verify-otp.module#VerifyOtpPageModule' }
  // { path: '**', loadChildre}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
