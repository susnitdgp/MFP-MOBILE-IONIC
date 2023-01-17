import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSearchFilterPage } from './user-search-filter';

@NgModule({
  declarations: [
    UserSearchFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSearchFilterPage),
  ],
})
export class UserSearchFilterPageModule {}
