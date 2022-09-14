import { AssetLoadingView } from '../../../../modules/asset/v3/asset_loading_view';
import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
import { AssetManager } from '@/modules/asset/v3/asset_manager';
export declare class PorscheLoadingView extends AssetLoadingView {
    private _mainKVImage;
    private _logoImage;
    private _backgroundImage;
    private _compleButton;
    private _isMobile;
    private _sleeptime;
    private _bg;
    private _aboutMeImage;
    constructor(scene: BABYLON.Scene, ui: BABYLONGUI.AdvancedDynamicTexture, assetManager: AssetManager, onEnter: () => void);
    loadingProgressUpdate(progress: number): void;
    hide(): void;
}
