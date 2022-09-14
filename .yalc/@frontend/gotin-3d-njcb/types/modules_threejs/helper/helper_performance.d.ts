import type { Scene } from '../../modules_threejs/scene/scene';
import { GUI } from 'lil-gui';
export declare class HelperPerformance {
    private _scene;
    private _ui;
    private _textBlockList;
    private _folder;
    private _controls;
    private _guiData;
    constructor(scene: Scene, ui: GUI);
    private _updateHandler;
    private getObjectInfo;
}
