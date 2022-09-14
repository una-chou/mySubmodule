import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
import { AssetLoadingViewOptionsInterface } from './asset_loading_view_options_interface';
import { AssetManager } from './asset_manager';
export declare class AssetLoadingView {
    private _scene;
    private _ui;
    private _assetManager;
    private _progressText;
    private _completeButton;
    private _progressBackgroundImage;
    private _bg;
    private _isShow;
    private _dpr;
    private _sleeptime;
    private _pxList;
    private _platform;
    /**
     * 加载页面；
     */
    constructor(scene: BABYLON.Scene, ui: BABYLONGUI.AdvancedDynamicTexture, assetManager: AssetManager, options: AssetLoadingViewOptionsInterface, onEnter: () => void);
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
    private _updateHandler;
    private unitFix;
    private merageProps;
    private _createBg;
}
