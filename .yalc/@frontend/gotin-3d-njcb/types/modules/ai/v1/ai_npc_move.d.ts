import { CharacterInterface } from '../../../modules/avatar/v1/character_interface';
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
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, npc: CharacterInterface);
    update(): void;
}
