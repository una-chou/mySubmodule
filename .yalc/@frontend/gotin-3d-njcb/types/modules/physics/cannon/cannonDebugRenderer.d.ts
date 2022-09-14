import * as THREE from 'three';
import * as CANNON from 'cannon';
export default class CannonDebugRenderer {
    scene: THREE.Scene;
    world: CANNON.World;
    private _meshes;
    private _material;
    private _particleMaterial;
    private _sphereGeometry;
    private _boxGeometry;
    private _cylinderGeometry;
    private _planeGeometry;
    private _particleGeometry;
    private tmpVec0;
    private tmpVec1;
    private tmpVec2;
    private tmpQuat0;
    constructor(scene: THREE.Scene, world: CANNON.World, options?: object);
    update(): void;
    private _updateMesh;
    private _typeMatch;
    private _createMesh;
    private _scaleMesh;
}
