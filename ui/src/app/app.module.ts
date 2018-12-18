import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToasterContainerComponent, ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

import { AppRoutes } from './app.routes';
import {MaterialModule} from './material.module';

// Services
import { UtilsService } from '../app/services/utils.service';

import { AppComponent } from './app.component';
import { TempComponent } from './temp';

@NgModule({
  declarations: [
    AppComponent,
    TempComponent
  ],
  entryComponents:[
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(AppRoutes),
    ToasterModule.forRoot()
  ],
  providers: [
    ToasterService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
