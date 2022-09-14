import { CharacterInterface } from '../../../modules/avatar/v1/character_interface';
import * as BABYLON from '@babylonjs/core';
export declare class KeyboardController {
    private _scene;
    private _camera;
    private _player;
    private _animationState;
    private _tempQuat;
    private _locateBox;
    private _tempRotation;
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, player: CharacterInterface, locateBox: BABYLON.Mesh);
    attachPlayer(): void;
    detachPlayer(): void;
    private _keys;
    private _action;
    private _speed;
    private _keydownHandler;
    private _keyupHandler;
    private _setAnimationState;
    update: () => void;
}
