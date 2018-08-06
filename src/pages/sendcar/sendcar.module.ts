import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendcarPage } from './sendcar';
import { SearchPage } from './search';

@NgModule({
  declarations: [
    SendcarPage,
    SearchPage
  ],
  imports: [
    IonicPageModule.forChild(SendcarPage),
    IonicPageModule.forChild(SearchPage),
  ],
})
export class SendcarPageModule { }
