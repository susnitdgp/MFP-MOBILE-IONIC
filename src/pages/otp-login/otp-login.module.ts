import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtpLoginPage } from './otp-login';

@NgModule({
  declarations: [
    OtpLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(OtpLoginPage),
  ],
})
export class OtpLoginPageModule {}
