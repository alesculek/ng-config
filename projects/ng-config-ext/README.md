# ng-config-ext

Angular configuration loaded in the runtime. Build once, deploy anywhere.

The main focus of this package is to externalize frontend configuration the app itself and allow loading the config via this package.
As the configuration for your application is externalized, you can build your app once and decide on the configuration value when starting up.
DevOps and QAs will love you.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.12.


## Basic usage

**1) Implement config endpoint in order to retrieve the configuration**

This can be achieved by many ways, from exposing a static file (json) to using your favourite web server.
Here you can find an example with express and [config](https://www.npmjs.com/package/config) package:

> The responsibility of serving the configuration is not the part of this package as it may be different in different projects.
Anyway, one of planed features is to provide "side-car" packages to be used with your loved backend services.

```nodejs
import config from 'config';

app.get('/api/config/', (req, res) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  // Be sure that you don't expose any secret by doing so in you project.
  // A good practice is to create a 'frontend' node in your config and use config.get('frontend')
  // instead of returning the whole configuration set.
  res.send(config);
});
```

**2) Fetch the config via ng-config-ext**

In your app.module.ts:

```angular
import { AppConfigModule } from 'ng-config-ext';

@NgModule({
  imports: [
    // ...
    // Import the module with your own configuration
    AppConfigModule.forRoot({
      // Tell the module where the config is located
      url: '/api/config/',
    }),
    // ... another imports
  ],
  // ... the rest of the App (root) module definition is omited here
})
export class AppModule { }
```

Importing the module will register `APP_INITIALIZER` provider which performs HTTP request to retrieve the config during app startup.

**3) Require AppConfigService in order to get configuration value**

```angular
import { Component } from '@angular/core';
import { AppConfigService } from 'ng-config-ext';

@Component({
  selector: 'app-root',
  template: '<span> {{ configVal }} </span>',
})
export class AppComponent {
  configVal;

  constructor(private configService: AppConfigService) {}

  ngOnInit(): void {
    // The parameter is dotted key path in your config object returned from the api
    this.configVal = this.configService.get('foo.bar');
  }
}
```

## Isn't it just moving configuration to a different place?

No, it is not. By this approach we are pushing the configuration responsibility to the server side logic.
By doing so, you can use your favorite library or framework to retrieve the configuration in standardized way,
for example [config](https://www.npmjs.com/package/config) is describing it's own principles how the config is loaded and evaluated.
As a bonus, you don't have to stick just to the nodejs-based solution and you can use e.g. spring boot
to provide basic functionality for your frontend app.


## Another config providers

The package was primarly designed to solve loading a configuration via REST HTTP API in the same way among several projects.
The intention was to leave the doors open for any other configuration providers.
If you are missing some provider or you have an idea for a provider to be implemented, [please submit PR here](https://github.com/tvikit/ng-config).


## Contribute

Visit [the github repository](https://github.com/tvikit/ng-config) and submit PR.
