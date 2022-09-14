import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
import { AssetManager } from './asset_manager';
export declare class AssetLoadingView {
    private _scene;
    private _assetManager;
    _ui: BABYLONGUI.AdvancedDynamicTexture;
    _uiText: BABYLONGUI.TextBlock;
    private _isShow;
    /**
     * 加载页面；
     */
    constructor(scene: BABYLON.Scene, ui: BABYLONGUI.AdvancedDynamicTexture, assetManager: AssetManager);
    /**
     * 释放资源；
     */
    dispose(): void;
    /**
     * 显示加载页面；
     */
    show(): void;
    /**
     * 隐藏加载页面
     */
    hide(): void;
    unregisterUpdateHandler(): void;
    _updateHandler: () => void;
    loadingProgressUpdate(progress: number): void;
}
