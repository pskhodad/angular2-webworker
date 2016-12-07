import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyComponent } from './components/my-component';
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
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    WebWorkerModule.ctorParameters = [];
    return WebWorkerModule;
}());
//# sourceMappingURL=webworker.module.js.map