import * as BABYLON from '@babylonjs/core';
export declare class SceneSound {
    private _scene;
    _camera: BABYLON.ArcRotateCamera;
    private _ui;
    private _hasEnter;
    constructor(engine: BABYLON.Engine);
    private _createCamera;
    update(): void;
    resize(): void;
    onEnter(): void;
}
