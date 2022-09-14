import * as BABYLON from '@babylonjs/core';
import { AssetInterface } from './asset_interface';
import { AssetModel } from './asset_model';
export declare class AssetManager {
    private _loadingTotal;
    private _loadedCompletionNumber;
    private _maxAsyncLoadNumber;
    private _isLoadingNumber;
    private _scene;
    private _loadingView;
    private _dataSource;
    firstScreenloadCompltion?: () => void;
    private _assetManager;
    constructor(scene: BABYLON.Scene);
    update(): void;
    getAssetContainer(assetName: string): BABYLON.AssetContainer | undefined;
    configDataSource(assetNameArray: string[]): void;
    private loadAssetContainer;
    private loadAssetContainerCompletion;
    loadAsset(asset: AssetInterface, onSuccess: (container: BABYLON.AssetContainer) => void | null, onError: (message: string) => void | null): void;
    /**
     * 统一的加载资源方法
     * @param assetModels 需要加载的数据源
     * @param showLoadingView  是否需要加载动画 默认为 true: 需要动画
     * @param isAsync 是否是异步加载  默认为 true: 异步加载
     * @param onSuccess 加载成功回调 assetModels为数组时，全部加载成功才会触发此回调
     * @param onError  加载失败回调 ** assetModels为数组时，只要有一个加载失败，该回调均会触发
     */
    loadAssetNew(assetModels: AssetModel | AssetModel[], showLoadingView?: boolean, isAsync?: boolean, onSuccess?: () => void, onError?: () => void): void;
}
