import * as BABYLON from '@babylonjs/core';
export declare class AssetLoadingView {
    private _ui;
    private _uiText;
    private _isShow;
    constructor(scene: BABYLON.Scene);
    show(): void;
    hidden(): void;
    updateContent(content: string): void;
}
