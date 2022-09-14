import * as BABYLON from '@babylonjs/core';
export interface LightInterface {
    light1: BABYLON.HemisphericLight;
    light2?: BABYLON.DirectionalLight;
    shadow?: BABYLON.ShadowGenerator;
}
