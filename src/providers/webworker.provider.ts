import { Injectable, OpaqueToken, Optional } from '@angular/core';

export const WorkerScriptToken = new OpaqueToken('WORKERSCRIPT');
export const DEFAULT_WORKERSCRIPT_NAME: string = "worker.js";

@Injectable()
export class WebWorkerProvider {
  
  port: any;
  _pendingRequests: any;
  workerscript: string;

  constructor(workerscript: string) {

    this.port = new Worker(workerscript);

    // worker jobs awaiting response {callId: [resolve, reject]}
    this._pendingRequests = {};

    this.port.addEventListener('message', event => {
      const {portCallerResponseId, value, error} = event.data;

      if (!portCallerResponseId) return;

      const [resolve, reject] = this._pendingRequests[portCallerResponseId];
      delete this._pendingRequests[portCallerResponseId];

      if (error) {
        reject(new Error(error));
        return;
      }

      resolve(value);
    });

    if (this.port.start) this.port.start();

  }

  send(method, ...args) {
    this.port.postMessage({
      method,
      args
    });
  }
  call(method, ...args) {
    return new Promise((resolve, reject) => {
      const portCallerMessageId = Math.random();
      this._pendingRequests[portCallerMessageId] = [resolve, reject];

      this.port.postMessage({
        method,
        args,
        portCallerMessageId
      });
    });
  }

}

export function setupWebWorker(workerscript: string) {
      
      const ww = new WebWorkerProvider(workerscript);
      return ww;
}
