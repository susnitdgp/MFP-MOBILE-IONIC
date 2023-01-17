import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MetaDataPage } from './meta-data';

@NgModule({
  declarations: [
    MetaDataPage,
  ],
  imports: [
    IonicPageModule.forChild(MetaDataPage),
  ],
})
export class MetaDataPageModule {}
