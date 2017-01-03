import { NgModule, ModuleWithProviders } from '@angular/core';
import { WebWorkerProvider, WebWorkerToken, setupWebWorker } from './providers/webworker.provider';

export interface WebWorkerModuleConfig {
  worker: any
}

@NgModule({})
export class WebWorkerModule {
  static forRoot(config: WebWorkerModuleConfig): ModuleWithProviders {
    return {
      ngModule: WebWorkerModule,
      providers: [
        { provide: WebWorkerToken, useValue: config.worker },
        { provide: WebWorkerProvider, useFactory: setupWebWorker, deps: [WebWorkerToken] }
      ]
    }
  }
}
