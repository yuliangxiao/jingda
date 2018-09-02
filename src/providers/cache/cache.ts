import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/**
 * 用枚举管理key值，防止字符串拼错
 */
export enum CacheKeys {
  TOKEN, AUTO_LOGIN, USER_INFO, username
}

@Injectable()
export class CacheProvider {
  constructor(public http: Http, public storage: Storage) {
    //console.log(CacheKeys[CacheKeys.TOKEN]);
  }
  GetStorageInfo(cachekeys: CacheKeys) {
    let keyvalue = "";
    this.storage.get(CacheKeys[cachekeys]).then((val) => {
      keyvalue = val;
    });
    return keyvalue;
  }
}