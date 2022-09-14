import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
export interface AvatarInterface {
    name: string;
    rootHeight: number;
    root: BABYLON.Mesh;
    asset: BABYLON.AssetContainer;
    billboard?: {
        mesh: BABYLON.Mesh;
        texture: BABYLONGUI.AdvancedDynamicTexture;
    };
    titleText?: BABYLONGUI.TextBlock;
    titleView?: BABYLONGUI.Container;
}
