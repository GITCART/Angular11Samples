import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MailModule} from './mail/mail.module';
import {RouterModule, Routes} from '@angular/router';

export const ROUTES: Routes = [
  { path: '**', redirectTo: 'folder/inbox'}
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MailModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
