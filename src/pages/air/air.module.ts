import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirPage } from './air';
import { Camera, CameraOptions } from '@ionic-native/camera';


@NgModule({
  declarations: [
    AirPage,
  ],
  imports: [
    IonicPageModule.forChild(AirPage),
  ],
  providers: [
    Camera
  ]
})
export class AirPageModule { }
