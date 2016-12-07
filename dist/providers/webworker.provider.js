import { Injectable, OpaqueToken } from '@angular/core';
export var WorkerScriptToken = new OpaqueToken('WORKERSCRIPT');
export var WebWorkerProvider = (function () {
    function WebWorkerProvider(workerscript) {
        console.log(workerscript);
    }
    WebWorkerProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebWorkerProvider.ctorParameters = [
        null,
    ];
    return WebWorkerProvider;
}());
export function setupWebWorker(workerscript) {
    var ww = new WebWorkerProvider(workerscript);
    return ww;
}
//# sourceMappingURL=webworker.provider.js.map