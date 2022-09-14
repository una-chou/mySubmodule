import { Avatar } from '../../../../modules/avatar/v2/avatar';
import { AvatarInterface } from '@/modules/avatar/v2/avatar_interface';
import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
import { NpcConfigInterface } from './npc_config_interface';
export declare function StandStillNpc(scene: BABYLON.Scene, ui: BABYLONGUI.AdvancedDynamicTexture, avatar: Avatar, player: AvatarInterface, personArray: NpcConfigInterface[]): Record<string, AvatarInterface>;
export declare function RoamingAroundNpc(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, avatar: Avatar): AvatarInterface[];
