import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigModuleConfig, AppConfigModuleConfigToken } from './app-config-module-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(
    private http: HttpClient,
    @Inject(AppConfigModuleConfigToken)
    private config: AppConfigModuleConfig,
  ) { }

  configData: object;

  load(): Promise<Object> {
    return this.http
      .get(this.config.url)
      .toPromise()
      .then(response => this.configData = response);
  }

  get(key: string = null): any {
    if (key === null) {
      return this.configData;
    }

    const lodashLikeGet = (obj: object, key: string) => key
      .split('.')
      .reduce((obj, pathKey) => obj[pathKey], obj);

    return lodashLikeGet(this.configData, key);
  }
}
