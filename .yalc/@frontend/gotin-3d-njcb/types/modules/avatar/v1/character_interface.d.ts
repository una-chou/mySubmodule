import * as BABYLON from '@babylonjs/core';
export interface CharacterInterface {
    root: BABYLON.Mesh;
    rootMaterial: BABYLON.StandardMaterial;
    billboard: BABYLON.Mesh;
    billboardMaterial: BABYLON.StandardMaterial;
    billboardTexutre: BABYLON.DynamicTexture;
    billboardText: string;
    asset: BABYLON.InstantiatedEntries | null;
}
