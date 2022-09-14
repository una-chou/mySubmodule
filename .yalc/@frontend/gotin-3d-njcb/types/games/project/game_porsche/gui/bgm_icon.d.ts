import * as BABYLONGUI from '@babylonjs/gui';
export declare enum BgmState {
    None = 0,
    Loading = 1,
    Running = 2,
    Rest = 3
}
export declare class BgmManager {
    private static _instance;
    isPlayWhenRunning: boolean;
    private state;
    private constructor();
    static getInstance(): BgmManager;
    loadAndPlay(ui: BABYLONGUI.AdvancedDynamicTexture): void;
    rest(): void;
    resume(): void;
    clear(): void;
}
