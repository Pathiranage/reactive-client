import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuotesComponent} from './quotes/quotes.component';
import {FormsModule} from '@angular/forms';
import {Quote} from './model/quote';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    Quote
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
