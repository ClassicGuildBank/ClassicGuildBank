import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RegisterUserComponent } from './register-user.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { ConfirmEmailComponent } from './confirm-email.component';
import { ResetPasswordComponent } from './reset-password.component';
import { PasswordCallbackComponent } from './password-callback.component';
import { InviteComponent } from './invite.component';
import { PreferencesComponent } from './preferences.component';

@NgModule({
  declarations: [LoginComponent, RegisterUserComponent, ConfirmEmailComponent, ResetPasswordComponent, PasswordCallbackComponent, InviteComponent, PreferencesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'confirm', component: ConfirmEmailComponent},
      {path: 'login', redirectTo: "login/"},
      {path: 'login/:guildToken', component: LoginComponent},
      {path: 'reset', component: PasswordCallbackComponent},
      {path: 'invite/:guildToken', component: InviteComponent},
      {path: 'preferences', component: PreferencesComponent}
    ])
  ],
  exports: [LoginComponent, ConfirmEmailComponent, RegisterUserComponent, PreferencesComponent]
  
})
export class UserModule { }
