import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AuthFormComponent} from './auth-form.component';
import {FormsModule} from '@angular/forms';
import {AuthRememberComponent} from './auth-remember.component';
import {AuthMessageComponent} from './auth-message.component';


@NgModule({
  declarations: [
    AuthFormComponent,
    AuthRememberComponent,
    AuthMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports:[
    AuthFormComponent, AuthRememberComponent
  ],
  providers: []
})
export class AuthFormModule {
}
