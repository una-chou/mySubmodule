import { CharacterInterface } from '../../../modules/avatar/v1/character_interface';
import * as BABYLON from '@babylonjs/core';
import { AnimationStateMachine } from './animation_state_machine';
export declare class PointController {
    isEnabledCameraRotation: boolean;
    private _scene;
    private _camera;
    private _player;
    private _targetPoint;
    private _targetPointLookAt;
    private _tempQuat;
    private _tempQuat2;
    private _locateBox;
    private _locateBox2;
    private _tempRotation;
    private _tempRotation2;
    private _speed;
    private _speedTime;
    private _discPin;
    private _animationFuc?;
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, player: CharacterInterface, locateBox: BABYLON.Mesh, animationStateMachine?: AnimationStateMachine);
    attachPlayer(): void;
    detachPlayer(): void;
    private _clickHandler;
    update: () => void;
}
