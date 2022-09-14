import { AssetManager } from '../../../modules/asset/v5/asset_manager';
import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
export declare class HelperPerformance {
    private _engine;
    private _scene;
    private _ui;
    private _assetManager?;
    private _fontSize;
    private _xFontOffset;
    private _textBlockList;
    private _textBloackListLength;
    private _totalDelta;
    /**
     * 构造函数；
     * @param scene
     */
    constructor(scene: BABYLON.Scene, ui: BABYLONGUI.AdvancedDynamicTexture, assetManager?: AssetManager | undefined);
    /**
     * 每帧更新；
     */
    private _updateHandler;
    /**
     * 窗口resize时更新；
     */
    private _resizeHandler;
    private _createTextBlock;
    private _setBlockPosition;
}
