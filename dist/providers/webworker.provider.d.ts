import { OpaqueToken } from '@angular/core';
export declare const WebWorkerToken: OpaqueToken;
export declare class WebWorkerProvider {
    worker: any;
    private _callbacks;
    private messageIds;
    constructor(worker: any);
    private onMessage(self, e);
    postMessage(userMessage: any): Promise<{}>;
}
export declare function setupWebWorker(worker: Worker): WebWorkerProvider;
