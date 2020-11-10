# NgConfig

Angular configuration loaded in the runtime. Build once, deploy anywhere.

The main focus of this package is to externalize frontend configuration the app itself and allow loading the config via this package.
As the configuration for your application is externalized, you can build your app once and decide on the configuration value when starting up.
DevOps and QAs will love you.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.12.

## Basic usage

1) Implement config endpoint in order to retrieve the configuration

This can be achieved by many ways, from exposing a static file (json) to using your favourite web server.
Here you can find an example with express and config package:

```nodejs
import config from 'config';

app.get('/api/config/', (req, res) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  res.send(config);
}
```

2) Fetch the config via ng-config-ext

In your app.module.ts:

```angular
import { AppConfigModule } from 'ng-config-ext';

@NgModule({
  // ... th rest of the definition
  imports: [
    BrowserModule,
    // Import the module with your own configuration
    AppConfigModule.fromConfig({
      // Tell the module where the config is located
      url: '/api/config/',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

Importing the module will register `APP_INITIALIZER` provider which performs HTTP request to retrieve the config during app startup.

3) Require AppConfigService in order to get configuration value

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
    this.config = this.configService.get('foo.bar');
  }
}
```

## Code scaffolding

Run `ng generate component component-name --project ng-config-ext` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng-config-ext`.
> Note: Don't forget to add `--project ng-config-ext` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ng-config-ext` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-config-ext`, go to the dist folder `cd dist/ng-config-ext` and run `npm publish`.

## Running unit tests

Run `ng test ng-config-ext` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
