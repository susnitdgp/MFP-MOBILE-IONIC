import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForwardPage } from './forward';

@NgModule({
  declarations: [
    ForwardPage,
  ],
  imports: [
    IonicPageModule.forChild(ForwardPage),
  ],
})
export class ForwardPageModule {}
