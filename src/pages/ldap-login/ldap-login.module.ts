import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LdapLoginPage } from './ldap-login';

@NgModule({
  declarations: [
    LdapLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LdapLoginPage),
  ],
})
export class LdapLoginPageModule {}
