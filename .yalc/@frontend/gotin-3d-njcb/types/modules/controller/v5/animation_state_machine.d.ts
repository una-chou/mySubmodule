import { AvatarInterface } from '../../../modules/avatar/v2/avatar_interface';
import * as BABYLON from '@babylonjs/core';
export declare class AnimationStateMachine {
    private _scene;
    private _player;
    private _currentAnimation?;
    private _weightFactor;
    private _animationMap;
    constructor(scene: BABYLON.Scene, player: AvatarInterface);
    startAnimation(name: string): void;
    private onWeightUpdate;
}
