import * as BABYLON from '@babylonjs/core';
import { CharacterInterface } from '../../../modules/avatar/v1/character_interface';
import { AnimationStateMachine } from './animation_state_machine';
export declare class KeyboardControllerTwo {
    private _scene;
    private _camera;
    private _player;
    private _tempQuat;
    private _locateBox;
    private _tempRotation;
    private keyState;
    private _keyDirection;
    private _moveDirection;
    private _moveTarget;
    private _targetDirection;
    private _targetPosition;
    private _initPosition;
    private _targetBall;
    private _targetDistance;
    private _speed;
    private _animationFuc?;
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, player: CharacterInterface, locateBox: BABYLON.Mesh, animationStateMachine?: AnimationStateMachine);
    attachPlayer(): void;
    detachPlayer(): void;
    private _keydownHandler;
    private _updateTargetByKeyboard;
    private _updateTargetByClick;
    update: () => void;
}
