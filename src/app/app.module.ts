import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Base64 } from '@ionic-native/base64';
import { Md5 } from "ts-md5/dist/md5";
import { IonicStorageModule } from '@ionic/storage';
import { JPush } from '@jiguang-ionic/jpush';
import { JPushService } from 'ionic2-jpush/dist'
import { ProductServer } from '../assets/js/injection';
// import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { DeclaredetailedPage } from '../pages/declaredetailed/declaredetailed';
import { SearchPage } from '../pages/declaredetailed/search';
import { TallySearchPage } from '../pages/tally/tallysearch';
import { DeclarePage } from '../pages/declare/declare';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { DetailedPage } from '../pages/home/detailed';
import { BasicFeePage } from '../pages/contact/basic_fee';

import { TabsPage } from '../pages/tabs/tabs';
import { TallyPage } from '../pages/tally/tally';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonProvider } from '../providers/common/common';
import { ConfigProvider } from '../providers/config/config';
import { CacheProvider } from '../providers/cache/cache';

import { SendcarPageModule } from '../pages/sendcar/sendcar.module'
import { AirPageModule } from '../pages/air/air.module'
import { SendcardetailedPageModule } from '../pages/sendcardetailed/sendcardetailed.module'
import { ActionSheet, Loading, Confirm, Toast } from '../providers/tips/tips';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DeclarePage,
    SearchPage,
    TallySearchPage,
    TallyPage,
    DetailedPage,
    LoginPage,
    BasicFeePage,
    DeclaredetailedPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
      iconMode: 'ios',
      mode: 'ios'
    }),
    SendcarPageModule,
    SendcardetailedPageModule,
    AirPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TallyPage,
    DetailedPage,
    TallySearchPage,
    LoginPage,
    DeclarePage,
    BasicFeePage,
    SearchPage,
    DeclaredetailedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    ImagePicker,
    Base64,
    Md5,
    JPush,
    JPushService,
    FileTransferObject,
    [ProductServer],
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CommonProvider,
    ConfigProvider,
    CacheProvider,
    ActionSheet,
    Loading,
    Confirm,
    Toast
  ]
})
export class AppModule { }
