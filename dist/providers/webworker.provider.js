import { Injectable, OpaqueToken } from '@angular/core';
export var WebWorkerToken = new OpaqueToken('WEBWORKER');
function parseJsonSafely(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return false;
    }
}
export var WebWorkerProvider = (function () {
    function WebWorkerProvider(worker) {
        var _this = this;
        this.worker = worker;
        this._callbacks = {};
        this.messageIds = 0;
        worker.addEventListener('message', function (e) {
            _this.onMessage(worker, e);
        });
    }
    WebWorkerProvider.prototype.onMessage = function (self, e) {
        var message = parseJsonSafely(e.data);
        if (!message) {
            return;
        }
        var messageId = message[0];
        var error = message[1];
        var result = message[2];
        var callback = this._callbacks[messageId];
        if (!callback) {
            return;
        }
        delete this._callbacks[messageId];
        callback(error, result);
    };
    WebWorkerProvider.prototype.postMessage = function (userMessage) {
        var _this = this;
        var messageId = this.messageIds;
        var messageToSend = [messageId, userMessage];
        return new Promise(function (resolve, reject) {
            _this._callbacks[messageId] = function (error, result) {
                if (error) {
                    return reject(new Error(error.message));
                }
                resolve(result);
            };
            var jsonMessage = JSON.stringify(messageToSend);
            _this.worker.postMessage(jsonMessage);
        });
    };
    WebWorkerProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WebWorkerProvider.ctorParameters = function () { return [
        null,
    ]; };
    return WebWorkerProvider;
}());
export function setupWebWorker(worker) {
    return new WebWorkerProvider(worker);
}
//# sourceMappingURL=webworker.provider.js.map