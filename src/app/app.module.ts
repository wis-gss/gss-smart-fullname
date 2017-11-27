import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { AppComponent } from './app.component';
import { GssSmartFullNameComponent } from './components/gss-smart-full-name/gss-smart-full-name.component';

@NgModule({
  declarations: [
    AppComponent,
    GssSmartFullNameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
