import * as BABYLON from '@babylonjs/core';
import { AvatarAssetOptionInterface } from './avatar_asset_options_Interface';
import { AvatarInterface } from './avatar_interface';
export declare class Avatar {
    private _scene;
    private _avatarAsset;
    private _avatarMaterial;
    private _isDebug;
    /**
     * 角色创建类
     **/
    constructor(scene: BABYLON.Scene, avatarAsset: BABYLON.AssetContainer, avatarTextureUrl: string, isDebug?: boolean);
    /**
     * 创建一个人物;
     */
    CreateAvatar(name: string, titleTextString?: string, titleViewUrl?: {
        activeImageUrl: string;
        defaultImageUrl: string;
    }, options?: AvatarAssetOptionInterface): AvatarInterface;
    private _createBillboard;
    private _createTitleView;
    private _createTitleText;
    private _createRoot;
    private _cloneAvatarAsset;
}
