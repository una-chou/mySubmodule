import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
import { AvatarInterface } from '../../../../modules/avatar/v2/avatar_interface';
export declare function NpcTitleView(scene: BABYLON.Scene, npc: AvatarInterface, ui: BABYLONGUI.AdvancedDynamicTexture, titleInfo: {
    name?: string;
    activeImage?: string;
    defaultImage?: string;
}): void;
