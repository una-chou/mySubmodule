import * as BABYLON from '@babylonjs/core';
export declare class TestCaseBoxs {
    private _engine;
    private _scene;
    constructor(canvas: HTMLCanvasElement);
    dispose(): void;
}
export declare class SceneBoxs {
    private _scene;
    camera: BABYLON.ArcRotateCamera;
    ground: BABYLON.Mesh;
    private _gui;
    private _boxList;
    constructor(engine: BABYLON.Engine, canvas: HTMLCanvasElement);
    update(): void;
    private _initBoxs;
    private _computeLenOfCube;
    private _computePosByIndex;
    private _initInputGUI;
    changeBoxQuantity(size: number): void;
}
