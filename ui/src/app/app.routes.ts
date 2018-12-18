import {Routes} from '@angular/router';

import {AppComponent} from './app.component';
import { TempComponent } from './temp';


export const AppRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch:'full'},
    {path: 'home', component:TempComponent}
]