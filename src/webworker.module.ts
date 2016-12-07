import { Observable } from 'rxjs';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyComponent } from './components/my-component';
import { WebWorkerProvider, WorkerScriptToken, setupWebWorker } from './providers/webworker.provider';

@NgModule({
  declarations: [
    MyComponent
  ],
  exports: [
    MyComponent
  ],
  imports: [
    BrowserModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class WebWorkerModule {

    static forRoot(workerscript: string): ModuleWithProviders {
        
        console.log(workerscript);

        return {
            ngModule: WebWorkerModule,
            providers: [
              { provide: WorkerScriptToken, useValue: workerscript },
              { provide: WebWorkerProvider, useFactory: setupWebWorker, deps: [ WorkerScriptToken ]  }
            ]
        };
    }

}
