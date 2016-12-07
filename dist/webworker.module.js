import { NgModule } from '@angular/core';
import { WebWorkerProvider, WorkerScriptToken, setupWebWorker } from './providers/webworker.provider';
export var WebWorkerModule = (function () {
    function WebWorkerModule() {
    }
    WebWorkerModule.forRoot = function (workerscript) {
        console.log(workerscript);
        return {
            ngModule: WebWorkerModule,
            providers: [
                { provide: WorkerScriptToken, useValue: workerscript },
                { provide: WebWorkerProvider, useFactory: setupWebWorker, deps: [WorkerScriptToken] }
            ]
        };
    };
    WebWorkerModule.decorators = [
        { type: NgModule, args: [{},] },
    ];
    /** @nocollapse */
    WebWorkerModule.ctorParameters = [];
    return WebWorkerModule;
}());
//# sourceMappingURL=webworker.module.js.map