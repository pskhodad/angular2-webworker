import { Injectable, OpaqueToken } from '@angular/core';
export var WorkerScriptToken = new OpaqueToken('WORKERSCRIPT');
export var DEFAULT_WORKERSCRIPT_NAME = "worker.js";
export var WebWorkerProvider = (function () {
    function WebWorkerProvider(workerscript) {
        var _this = this;
        this.port = new Worker(workerscript);
        // worker jobs awaiting response {callId: [resolve, reject]}
        this._pendingRequests = {};
        this.port.addEventListener('message', function (event) {
            var _a = event.data, portCallerResponseId = _a.portCallerResponseId, value = _a.value, error = _a.error;
            if (!portCallerResponseId)
                return;
            var _b = _this._pendingRequests[portCallerResponseId], resolve = _b[0], reject = _b[1];
            delete _this._pendingRequests[portCallerResponseId];
            if (error) {
                reject(new Error(error));
                return;
            }
            resolve(value);
        });
        if (this.port.start)
            this.port.start();
    }
    WebWorkerProvider.prototype.send = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.port.postMessage({
            method: method,
            args: args
        });
    };
    WebWorkerProvider.prototype.call = function (method) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var portCallerMessageId = Math.random();
            _this._pendingRequests[portCallerMessageId] = [resolve, reject];
            _this.port.postMessage({
                method: method,
                args: args,
                portCallerMessageId: portCallerMessageId
            });
        });
    };
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