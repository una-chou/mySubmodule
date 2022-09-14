import * as BABYLON from '@babylonjs/core';
export declare class SceneLoader {
    private _scene;
    _camera: BABYLON.ArcRotateCamera;
    private _avatarContainer?;
    private _avatarTexture;
    private _avatarXieIndex;
    constructor(engine: BABYLON.Engine);
    private _createCamera;
    private _showMan;
    update(): void;
}
