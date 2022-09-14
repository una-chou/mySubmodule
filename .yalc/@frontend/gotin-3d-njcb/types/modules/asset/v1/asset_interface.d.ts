import * as BABYLON from '@babylonjs/core';
/**
 * 资源接口定义；
 */
export interface AssetInterface {
    rootUrl: string;
    file: string;
}
export interface AssetInterfaceNew {
    readonly filePath: string;
    readonly lowFilePath?: string;
    readonly fileName: string;
    babylonAssetContainer?: BABYLON.AssetContainer;
}
