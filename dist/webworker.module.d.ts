import { ModuleWithProviders } from '@angular/core';
export interface WebWorkerModuleConfig {
    worker: any;
}
export declare class WebWorkerModule {
    static forRoot(config: WebWorkerModuleConfig): ModuleWithProviders;
}
