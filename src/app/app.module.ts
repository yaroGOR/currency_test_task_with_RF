import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { HttpClientModule } from '@angular/common/http';
 
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
