import * as THREE from 'three';
import CANNON from 'cannon';
export declare class Physics {
    private _scene;
    private _camera;
    private _world;
    private _body;
    bodies: CANNON.Body[];
    visuals: THREE.Object3D[];
    vehicle: CANNON.RaycastVehicle;
    private _cannonDebugRenderer;
    private shereBody;
    private chassisBody;
    private theta;
    private phi;
    private radius;
    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera | undefined);
    initModel(): void;
    handleMouseMove(event: MouseEvent, deltaX: number, deltaY: number): void;
    private thirdPersonCameraControl;
    private initPhysics;
    private CreateTrimesh;
    private CreateConvexPolyhedron;
    private handler;
    private addVisual;
    private shape2mesh;
    update(): void;
    updateVisuals(): void;
    updatePhysics(): void;
}
