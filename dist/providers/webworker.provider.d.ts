import { OpaqueToken } from '@angular/core';
export declare const WorkerScriptToken: OpaqueToken;
export declare const DEFAULT_WORKERSCRIPT_NAME: string;
export declare class WebWorkerProvider {
    port: any;
    _pendingRequests: any;
    workerscript: string;
    constructor(workerscript: string);
    send(method: any, ...args: any[]): void;
    call(method: any, ...args: any[]): Promise<{}>;
}
export declare function setupWebWorker(workerscript: string): WebWorkerProvider;
