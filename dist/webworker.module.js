import { NgModule } from '@angular/core';
import { WebWorkerProvider, WebWorkerToken, setupWebWorker } from './providers/webworker.provider';
export var WebWorkerModule = (function () {
    function WebWorkerModule() {
    }
    WebWorkerModule.forRoot = function (config) {
        return {
            ngModule: WebWorkerModule,
            providers: [
                { provide: WebWorkerToken, useValue: config.worker },
                { provide: WebWorkerProvider, useFactory: setupWebWorker, deps: [WebWorkerToken] }
            ]
        };
    };
    WebWorkerModule.decorators = [
        { type: NgModule, args: [{},] },
    ];
    /** @nocollapse */
    WebWorkerModule.ctorParameters = function () { return []; };
    return WebWorkerModule;
}());
//# sourceMappingURL=webworker.module.js.map