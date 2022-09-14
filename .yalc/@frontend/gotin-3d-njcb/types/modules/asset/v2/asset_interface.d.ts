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
    readonly loadPriority: LOAD_ASSET_PRIORITY;
    readonly babylonAssetContainer?: BABYLON.AssetContainer;
}
/**
 * 资源加载的优先级
 * **/
export declare enum LOAD_ASSET_PRIORITY {
    NORMAL = 0,
    LOW = -999,
    HEIGHT = 999
}
