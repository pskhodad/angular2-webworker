## Using WebWorkerModule and WebWorkerProvider in an Angular 2 / Ionic 2 app

## Preparing webworker to work with WebWorkerProvider

Add following snippet to your webworker.
You need to provide list of methods to run in webworker thread.

```typescript

function portListener(port, methods) {
  port.addEventListener('message', event => {
    const {portCallerMessageId, method, args} = event.data;

    if (!method) return;

    // just a "send"
    if (!portCallerMessageId) {
      methods[method](...args);
      return;
    }

    const source = event.source || port;

    // It wants a response too
    new Promise(resolve => resolve(methods[method](...args))).then(value => {
      source.postMessage({
        portCallerResponseId: portCallerMessageId,
        value
      });
    }, err => {
      source.postMessage({
        portCallerResponseId: portCallerMessageId,
        error: err.message
      });
    });
  });

  if (port.start) port.start();
}

// Provide methods to run in webworker thread.
// Picked from gist by Jake Archibald, https://gist.github.com/jakearchibald/7d3d0575afc24a1176fd56f522c593ec
portListener(self, {
  slowRandomNumber() {
    return new Promise(r => setTimeout(r, 3000))
      .then(() => Math.random());
  }
});

```

## Importing Module 
```typescript

// app.module.ts

import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Import your module
import { WebWorkerModule } from 'angular2-webworker';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),

    WebWorkerModule.forRoot("worker.js") // Put your module here
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}

// app.component.ts

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { WebWorkerProvider } from 'angular2-webworker';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, ww: WebWorkerProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}

```

## Importing only providers 
```typescript

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { WorkerScriptToken, WebWorkerProvider, setupWebWorker } from 'angular2-webworker';

@Component({
  templateUrl: 'app.html',
  providers : [
      { provide: WorkerScriptToken, useValue: "worker.js" },
      { provide: WebWorkerProvider, useFactory: setupWebWorker, deps: [ WorkerScriptToken ]  }
  ]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, ww: WebWorkerProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}

```
