import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Headers, Http, RequestOptions } from '@angular/http';

import { ConfigProvider } from '../config/config';
import { Injectable } from '@angular/core';

//处理过的响应数据
export interface IResponseData<T> {
  success: boolean;
  msg: string;
  code?: number;
  result?: T;      //响应数据
}

@Injectable()
export class CommonProvider {

  constructor(public authHttp: Http) {
  }

  /**
   * get方法(isJoinHost是为了兼容获取应用内部数据)
   * @param url 请求url
   * @param isJoinHost 是否合并到主机地址
   */
  get(url: string, isJoinHost: boolean = true) {
    url = (isJoinHost && url.indexOf('http') < 0) ? ConfigProvider.getApiHost() + encodeURI(url) : encodeURI(url);
    return this.authHttp.get(url)
      .timeout(60000)
      .toPromise()
      .then(result => result.json())
      .catch(resp => this.handleHttpError(resp));
  }

  /**
   * post方法
   * @param url 请求url
   * @param data 请求参数
   * @param options 请求选项
   */
  post(url: string, data: any = {}, options: RequestOptions = ConfigProvider.formOptions) {
    url = url.indexOf('http') > -1 ? url : ConfigProvider.getApiHost() + url;
    return this.authHttp.post(url, data, options)
      .timeout(60000)
      .toPromise()
      .then(result => result.json())
      .catch(resp => this.handleHttpError(resp));
  }

  /**
  * 处理http错误
  */
  handleHttpError(resp): IResponseData<any> {
    let errMsg = '抱歉，后台服务出错了';
    if (resp) {
      let msg: string = resp.message;
      if (msg && msg.toLowerCase().indexOf('timeout') > -1) {
        errMsg = '请求超时，请稍后重试！';
      } else {
        switch (resp.status) {
          case 401: errMsg = '无权限访问，或许登录信息已过期，请重新登录';
          case 404: errMsg = '抱歉，后台服务找不到对应接口';
          case 0: errMsg = '网络无法连接';
          default: break;
        }
      }
    }
    return { success: false, msg: errMsg, code: -1, result: null };
  }
}