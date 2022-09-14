import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
import { AvatarInterface } from '../../../modules/avatar/v3/avatar_interface';
export declare class Minimap {
    private _scene;
    private _player;
    private _ui;
    private _background;
    private _minimapView;
    private _playerLabel;
    private _isShow;
    private _minimapViewTop;
    private _playerLabelHeightHalf;
    /**
     * 创建小地图；
     */
    constructor(scene: BABYLON.Scene, ui: BABYLONGUI.AdvancedDynamicTexture, player: AvatarInterface);
    dispose(): void;
    show(): void;
    hide(): void;
    private _updateHandler;
    private _resizeHandler;
    private _createMinimapView;
    private _creatPlayerLabel;
    private _createBackground;
}
