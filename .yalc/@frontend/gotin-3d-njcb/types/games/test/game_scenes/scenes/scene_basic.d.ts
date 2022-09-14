import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
import { AssetManager } from '../../../../modules/asset/v1/asset_manager';
import { Controller } from '@/modules/controller/v2/controller';
import { CharacterInterface } from '@/modules/avatar/v1/character_interface';
export declare class SceneBasic {
    protected readonly engine: BABYLON.Engine;
    protected readonly scene: BABYLON.Scene;
    protected readonly camera: BABYLON.ArcRotateCamera;
    protected readonly ui: BABYLONGUI.AdvancedDynamicTexture;
    protected readonly assetManager: AssetManager;
    protected readonly player: CharacterInterface;
    protected readonly playerController: Controller;
    constructor(engine: BABYLON.Engine);
    configDataSource(): string[];
    dispose(): void;
    attachControls(): void;
    detachControls(): void;
    awake(): Promise<void>;
    update(): void;
    private _createSkybox;
}
