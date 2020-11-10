import { InjectionToken } from '@angular/core';

export const AppConfigModuleConfigToken = new InjectionToken<AppConfigModuleConfig>("AppConfig module configuration");

export interface AppConfigModuleConfig {
    url: string;
}
