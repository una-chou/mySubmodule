import CANNON from 'cannon';
import * as BABYLON from '@babylonjs/core';
export declare class mmoPhysics {
    private _scene;
    private _camera;
    private _world;
    private _body;
    bodies: CANNON.Body[];
    visuals: BABYLON.Mesh[];
    vehicle: CANNON.RaycastVehicle;
    private _cannonDebugRenderer;
    private shereBody;
    private chassisBody;
    constructor(scene: BABYLON.Scene);
    private initPhysics;
    private RigidBody;
    private CreateTrimesh;
    private CreateConvexPolyhedron;
    private addVisual;
    private shape2mesh;
    update: () => void;
    private updateVisuals;
    private updatePhysics;
}
