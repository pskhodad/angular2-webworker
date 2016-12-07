import { NgModule } from '@angular/core';
import { DEFAULT_WORKERSCRIPT_NAME, WebWorkerProvider, WorkerScriptToken, setupWebWorker } from './providers/webworker.provider';
export var WebWorkerModule = (function () {
    function WebWorkerModule() {
    }
    WebWorkerModule.forRoot = function (workerscript) {
        if (!workerscript) {
            workerscript = DEFAULT_WORKERSCRIPT_NAME;
        }
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