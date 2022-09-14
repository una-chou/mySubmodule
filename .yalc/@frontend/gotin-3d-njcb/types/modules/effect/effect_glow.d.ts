import * as BABYLON from '@babylonjs/core';
export declare class EffectGlow {
    private static instance;
    private _gl;
    private _addedMeshList;
    private constructor();
    /**
     * 有自发光层的模型会发光；
     */
    static getInstance(scene: BABYLON.Scene): EffectGlow;
    /**
     * 移除glow效果，释放资源；
     */
    dispose(): void;
    /**
     * 添加自发光；
     * @param mesh
     * @param color
     */
    addMesh(mesh: BABYLON.Mesh, color?: BABYLON.Color3): void;
}
