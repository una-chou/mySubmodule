import { CharacterInterface } from '../../../modules/avatar/v1/character_interface';
import * as BABYLON from '@babylonjs/core';
export declare class AnimationStateMachine {
    private _scene;
    private _camera;
    private _player;
    private _currentAnim?;
    private _weightFactor;
    private _animationMaps;
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, player: CharacterInterface);
    initPlayerAimation(): void;
    startAnimation(name: string): void;
    private getAnimtionByName;
    onWeightUpdate: () => void;
}
