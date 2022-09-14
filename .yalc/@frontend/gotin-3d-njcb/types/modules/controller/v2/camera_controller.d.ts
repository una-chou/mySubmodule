import { CharacterInterface } from '../../../modules/avatar/v1/character_interface';
import * as BABYLON from '@babylonjs/core';
import { CONTROLLER_TYPE_ENUM } from './controller_type_enum';
export declare class CameraController {
    private _scene;
    private _camera;
    private _player;
    private _time;
    private _cameraState?;
    private _controllerType?;
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, player: CharacterInterface);
    thirdPersonCamera(controllerType: CONTROLLER_TYPE_ENUM): void;
    firstPersonCamera(): void;
    private delayCamera;
    update: () => void;
}
