import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
export interface AvatarInterface {
    text: string;
    root: BABYLON.Mesh;
    rootHeight: number;
    asset: BABYLON.AssetContainer;
    billboard?: BABYLON.Mesh;
    titleView?: BABYLONGUI.Container;
}
