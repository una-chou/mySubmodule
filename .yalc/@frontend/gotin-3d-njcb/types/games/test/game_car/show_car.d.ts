import { AssetInterface } from '../../../modules/asset/v1/asset_interface';
import { AssetManager } from '@/modules/asset/v1/asset_manager';
import * as BABYLON from '@babylonjs/core';
export declare function showCar(scene: BABYLON.Scene, assetManager: AssetManager, hdrAsset: AssetInterface, car1Asset: {
    model: AssetInterface;
    texture: Record<string, string>;
}): void;
