import { AvatarInterface } from '../../../modules/avatar/v2/avatar_interface';
import * as BABYLON from '@babylonjs/core';
export declare class AiNpcMove {
    private _scene;
    private _camera;
    private _i;
    private _points;
    private _numberOfCoordinates;
    private _npc;
    private _theta;
    private _normals;
    private _isDebug;
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, npc: AvatarInterface, pathData?: Array<number[]>, velocityScale?: number);
    private updateHandler;
}
