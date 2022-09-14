import { CharacterInterface } from '../../../modules/avatar/v1/character_interface';
import * as BABYLON from '@babylonjs/core';
import { CHARACTER_CONTROL_ENUM } from './character_control_enum';
export declare class Camera_angle_of_view {
    private _scene;
    private _camera;
    private _player;
    private _time;
    private _cameraState?;
    private _controllerType?;
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, player: CharacterInterface);
    thirdPersonCamera(controllerType: CHARACTER_CONTROL_ENUM): void;
    firstPersonCamera(): void;
    private delayCamera;
    update: () => void;
}
