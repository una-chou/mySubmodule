import * as BABYLON from '@babylonjs/core';
export declare class Physics {
    private _scene;
    private _model;
    private _world;
    private _ground;
    private _body;
    private _groundMesh;
    constructor(scene: BABYLON.Scene, model: BABYLON.Mesh, ground: BABYLON.AbstractMesh);
    private initPhysics;
    private initMesh;
    update(): void;
}
