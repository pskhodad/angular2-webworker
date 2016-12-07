import { OpaqueToken } from '@angular/core';
export declare const WorkerScriptToken: OpaqueToken;
export declare class WebWorkerProvider {
    constructor(workerscript: string);
}
export declare function setupWebWorker(workerscript: string): WebWorkerProvider;
