import * as BABYLONGUI from '@babylonjs/gui';
import * as BABYLON from '@babylonjs/core';
import { DialogInterface } from './dialog_interface';
export declare class DialogView {
    private _ui;
    private _contentView;
    private _isMobile;
    private _dpr;
    doNextCallBack?: () => void;
    constructor(scene: BABYLON.Scene, ui: BABYLONGUI.AdvancedDynamicTexture);
    showDialog(dialogInterface?: DialogInterface, onClose?: () => void): void;
}
