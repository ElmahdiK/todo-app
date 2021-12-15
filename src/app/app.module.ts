import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

// import { TodosComponent } from './components/todos/todos.component';
// import { LoginComponent } from './components/login/login.component';


import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData, formatDate } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HeaderComponent } from './components/header/header.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
