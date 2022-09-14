import * as BABYLON from '@babylonjs/core';
import { AssetInterface } from '../v3/asset_interface';
export declare class AssetManager {
    /**
     * 资源加载过程中如果出现加载错误，需要重复加载两次，
     * 如果重复加载仍然出现错误需要提示游戏加载异常情况，
     * 要求游戏终止或进行其他提示处理；
     */
    hasLoadingError: boolean;
    /**
     * 同步加载队列完成；
     */
    isSyncLoadingComplete: boolean;
    /**
     * 同步加载队列进度；
     */
    syncLoadingProgress: number;
    /**
     * 异步加载资源完成
     */
    isAsyncLoadingComplete: boolean;
    /**
     * 异步加载队列进度；
     */
    asyncLoadingProgress: number;
    /**
     * 加载时长；
     */
    loadingTime: number;
    private _scene;
    private _syncAssetList;
    private _asyncAssetList;
    private _currentLoadingNumber;
    private _onError;
    /**
     * 资源加载管理类；
     * @param scene
     */
    constructor(scene: BABYLON.Scene, onError: () => void);
    /**
     * 每帧更新；
     */
    update(): void;
    /**
     * 添加同步加载资源
     */
    addSyncAsset(asset: AssetInterface): void;
    /**
     * 清空当前同步加载队列，重新加载进度计算；
     */
    clearSyncAsset(): void;
    /**
     * 添加异步加载资源，根据priority修改加载队列；
     */
    addAsyncAsset(asset: AssetInterface, priority?: number): void;
    private _updateLoadAsset;
    private _getSyncLoadingProgress;
    private _getAsyncLoadingProgress;
    /** 加载工具函数，不参与加载计数 */
    static loadAsset(scene: BABYLON.Scene, asset: AssetInterface, onSuccess?: (container: BABYLON.AssetContainer) => void, onError?: () => void): void;
}
