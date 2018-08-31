import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirPage } from './air';
import { Pieceweightruler } from './pieceweightruler';
import { Camera, CameraOptions } from '@ionic-native/camera';


@NgModule({
  declarations: [
    AirPage,
    Pieceweightruler
  ],
  imports: [
    IonicPageModule.forChild(AirPage),
    IonicPageModule.forChild(Pieceweightruler),
  ],
  providers: [
    Camera
  ]
})
export class AirPageModule { }
