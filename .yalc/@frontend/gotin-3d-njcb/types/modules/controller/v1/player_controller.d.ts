import * as BABYLON from '@babylonjs/core';
import { CHARACTER_CONTROL_ENUM } from './character_control_enum';
import { CHARACTER_CAMERA_ANGLE_OF_VIEW_ENUM } from './character_camera_angle_of_view_enum';
import { CharacterInterface } from '../../../modules/avatar/v1/character_interface';
export declare class PlayerController {
    cameraAngleOfViewState: CHARACTER_CAMERA_ANGLE_OF_VIEW_ENUM;
    private _scene;
    private _camera;
    private _player;
    private _pointController?;
    private _keyboardController?;
    private _keyboardControllerTwo?;
    private _rockerController?;
    private _cameraAngleOfView?;
    private _locateBox;
    private _animationState?;
    private _isEnabledUpdate;
    private _isEnabledControllerType;
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, player: CharacterInterface);
    setController(type: CHARACTER_CONTROL_ENUM): void;
    setCameraAngleOfView(type: CHARACTER_CAMERA_ANGLE_OF_VIEW_ENUM): void;
    closeController(): void;
    private initController;
    update(): void;
}
