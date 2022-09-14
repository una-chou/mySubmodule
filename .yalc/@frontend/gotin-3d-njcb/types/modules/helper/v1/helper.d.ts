import { AssetManager } from '../../../modules/asset/v3/asset_manager';
import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
export declare class Helper {
    private static _performance;
    private static _axes;
    private static _grid;
    static showPerfomance(scene: BABYLON.Scene, ui: BABYLONGUI.AdvancedDynamicTexture, assetManager?: AssetManager): void;
    /**
     * 显示坐标轴，对highlight效果有影响；
     */
    static showAxes(scene: BABYLON.Scene): void;
    /**
     * 显示地面网格，对highlight效果有影响；
     */
    static showGrid(scene: BABYLON.Scene, size: number): void;
    static showSkeleton(scene: BABYLON.Scene, skeleton: BABYLON.Skeleton, mesh: BABYLON.Mesh): void;
}
