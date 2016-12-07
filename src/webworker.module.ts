import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { WebWorkerProvider, WorkerScriptToken, setupWebWorker } from './providers/webworker.provider';

@NgModule({})
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
