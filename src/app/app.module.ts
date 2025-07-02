import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './components/product/product.component';
import { StatusPipe } from './pipes/status.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddProductComponent,
    StatusPipe,
    CurrencyPipe,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
