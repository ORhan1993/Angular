import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Form desteği için şart!
import { App } from './app';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  bootstrap: [App]
})
export class AppModule { }
