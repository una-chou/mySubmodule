import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
import { AssetInterface } from './asset_interface';
export declare class AssetManager {
    private _loadingNum;
    private _loadingTotal;
    private _loadedCompletionNumber;
    private _maxAsyncLoadNumber;
    private _scene;
    private _ui?;
    private _uiText;
    private _isUiAttached;
    private _dataSource;
    firstScreenloadCompltion?: () => void;
    constructor(scene: BABYLON.Scene, ui?: BABYLONGUI.AdvancedDynamicTexture);
    update(): void;
    getAssetContainer(assetName: string): BABYLON.AssetContainer | undefined;
    configDataSource(assetNameArray: string[]): void;
    private loadAssetContainer;
    private loadAssetContainerCompletion;
    loadAsset(asset: AssetInterface, onSuccess?: (container: BABYLON.AssetContainer) => void, onError?: (message: string) => void): void;
    loadAssetAsync(asset: AssetInterface): Promise<BABYLON.AssetContainer>;
    loadAssetListAsync(assetList: AssetInterface[]): Promise<BABYLON.AssetContainer[]>;
}
