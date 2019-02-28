import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RefresherComponent } from '../components/refresher/refresher.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [RefresherComponent],
  exports: [RefresherComponent]
})
export class SharedModule {}