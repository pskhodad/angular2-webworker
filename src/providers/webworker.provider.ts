import { Injectable, OpaqueToken, Optional } from '@angular/core';

export const WebWorkerToken = new OpaqueToken('WEBWORKER');

function parseJsonSafely(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

@Injectable()
export class WebWorkerProvider {
  private _callbacks: any = {};
  private messageIds: number = 0;
  
  constructor(public worker: any) {
    worker.addEventListener('message', (e) => {
      this.onMessage(worker, e);
    });
  }

  private onMessage(self: any, e: any) {
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
  }

  postMessage(userMessage: any) {
    let messageId = this.messageIds;
    let messageToSend = [messageId, userMessage];
    return new Promise((resolve, reject) => {
      this._callbacks[messageId] = (error, result) => {
        if (error) {
          return reject(new Error(error.message));
        }
        resolve(result);
      }
      var jsonMessage = JSON.stringify(messageToSend);
      this.worker.postMessage(jsonMessage);
    });    
  }

}

export function setupWebWorker(worker: Worker): WebWorkerProvider {
  return new WebWorkerProvider(worker);
}
