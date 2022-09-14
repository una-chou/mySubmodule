import * as BABYLON from '@babylonjs/core';
export interface PropsInterface {
    root: BABYLON.Mesh;
    rootMaterial: BABYLON.StandardMaterial;
    billboard: BABYLON.Mesh;
    billboardMaterial: BABYLON.StandardMaterial;
    billboardTexutre: BABYLON.DynamicTexture;
}
