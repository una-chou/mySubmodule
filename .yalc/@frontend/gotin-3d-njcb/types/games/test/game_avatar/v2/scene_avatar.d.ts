import * as BABYLON from '@babylonjs/core';
export declare class SceneAvatar {
    private _scene;
    _camera: BABYLON.ArcRotateCamera;
    private _ui;
    private _avatarContainer;
    private _avatarTexture;
    private _avatarShowOptions;
    constructor(engine: BABYLON.Engine);
    private _createCamera;
    update(): void;
    last(): void;
    next(): void;
    private _updateAvatar;
    private _formatAvatarMesh;
}
