import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RefresherComponent } from '../components/refresher/refresher.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { HeaderComponent } from '../components/header/header.component';
 
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [
    RefresherComponent, 
    LoadingComponent,
    HeaderComponent
  ],
  exports: [
    RefresherComponent, 
    LoadingComponent,
    HeaderComponent
  ]
})
export class SharedModule {}