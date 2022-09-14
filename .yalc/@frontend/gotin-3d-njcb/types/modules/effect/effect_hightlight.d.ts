import * as BABYLON from '@babylonjs/core';
export declare class EffectHightLight {
    private static instance;
    private _hl;
    private constructor();
    /**
     * 模型高亮；
     */
    static getInstance(scene: BABYLON.Scene): EffectHightLight;
    /**
     * 移除highlight效果，释放资源；
     */
    dispose(): void;
    addMesh(mesh: BABYLON.Mesh, color?: BABYLON.Color3): void;
}
