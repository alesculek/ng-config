import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { AppConfigModuleConfig, AppConfigModuleConfigToken } from './app-config-module-config';

export function appInitConfigFactory(appConfigService: AppConfigService) {
  // This is workaround for "Lambda not supported" error'
  // If the following function is returned immediatly via return () => ..., compiling fails
  // The root cause is "Lamba not supported"
  // see: https://github.com/ng-packagr/ng-packagr/issues/696
  const appInitConfig = () => appConfigService.load().toPromise();

  return appInitConfig;
}

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
          useFactory: appInitConfigFactory,
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
