import * as BABYLON from '@babylonjs/core';
import { AvatarAssetOptionInterface } from './avatar_asset_options_Interface';
import { AvatarInterface } from './avatar_interface';
import * as BABYLONGUI from '@babylonjs/gui';
import { LightInterface } from '../../../modules/light/light_interface';
export declare class Avatar {
    private _scene;
    private _avatarAsset;
    private _avatarMaterial;
    private _isDebug;
    private _isHighQuality;
    private _light?;
    private _ui?;
    /**
     * 角色创建类
     **/
    constructor(scene: BABYLON.Scene, avatarAsset: BABYLON.AssetContainer, isDebug?: boolean, light?: LightInterface, ui?: BABYLONGUI.AdvancedDynamicTexture);
    /**
     * 创建一个胶囊体人物；
     *
     * @param scene
     * @param text
     * @returns
     */
    CreateAvatar(text?: string, boundingBoxColor?: BABYLON.Color3, options?: AvatarAssetOptionInterface): AvatarInterface;
    private _cloneAvatarAsset;
}
