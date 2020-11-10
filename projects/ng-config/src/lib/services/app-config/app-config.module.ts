import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { AppConfigModuleConfig, AppConfigModuleConfigToken } from './app-config-module-config';


@NgModule()
export class AppConfigModule {
  
  static fromConfig(config: AppConfigModuleConfig) {
    return {
      ngModule: AppConfigModule,
      imports: [
        CommonModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: function (appConfigService: AppConfigService) {
            return function () {
              return appConfigService.load().toPromise();
            }
          },
          multi: true,
          deps: [ AppConfigService ],
        },
        {
          provide: AppConfigModuleConfigToken,
          useValue: config,
        },
      ],
    };
  }

}
