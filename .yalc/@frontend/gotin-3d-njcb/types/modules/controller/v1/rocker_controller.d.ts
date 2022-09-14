import { CharacterInterface } from '../../../modules/avatar/v1/character_interface';
import * as BABYLON from '@babylonjs/core';
export declare class Rocker_controller {
    private _scene;
    private _camera;
    private _player;
    private _animationState;
    private _tempQuat;
    private _locateBox;
    private _tempRotation;
    private _joystickMove?;
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, player: CharacterInterface, locateBox: BABYLON.Mesh);
    update: () => void;
}
