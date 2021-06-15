import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataImportComponent } from './data-import/data-import.component';

@NgModule({
  declarations: [
    AppComponent,
    DataImportComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DataImportComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
