import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/**
 * 用枚举管理key值，防止字符串拼错
 */
export enum CacheKeys {
  TOKEN, AUTO_LOGIN, USER_INFO
}

@Injectable()
export class CacheProvider {

  constructor(public http: Http, public storage: Storage) {
    console.log(CacheKeys[CacheKeys.TOKEN]);
  }
}