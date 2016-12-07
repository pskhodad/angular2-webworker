import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { DEFAULT_WORKERSCRIPT_NAME, WebWorkerProvider, WorkerScriptToken, setupWebWorker } from './providers/webworker.provider';

@NgModule({})
export class WebWorkerModule {

    static forRoot(workerscript?: string): ModuleWithProviders {
        
        if (!workerscript) {
          workerscript = DEFAULT_WORKERSCRIPT_NAME;
        }

        return {
            ngModule: WebWorkerModule,
            providers: [
              { provide: WorkerScriptToken, useValue: workerscript },
              { provide: WebWorkerProvider, useFactory: setupWebWorker, deps: [ WorkerScriptToken ]  }
            ]
        };
    }

}
