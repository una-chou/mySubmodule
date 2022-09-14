import * as BABYLON from '@babylonjs/core';
export declare class PointerMesh {
    private _pointerMesh;
    constructor(name: string, size: number, scene: BABYLON.Scene);
    setEnabled(state: boolean): void;
    scaleByTime(time: number): void;
    setPosition(position: BABYLON.Vector3): void;
}
