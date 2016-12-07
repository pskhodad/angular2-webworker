import { Injectable, OpaqueToken } from '@angular/core';

export const WorkerScriptToken = new OpaqueToken('WORKERSCRIPT');

@Injectable()
export class WebWorkerProvider {
  constructor(workerscript: string) {
    console.log(workerscript);
  }
}

export function setupWebWorker(workerscript: string) {
      const ww = new WebWorkerProvider(workerscript);
      return ww;
}
