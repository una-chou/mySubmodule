import { AvatarInterface } from '../../../modules/avatar/v2/avatar_interface';
import * as BABYLON from '@babylonjs/core';
export declare function NpcLookAtPlayer(scene: BABYLON.Scene, npc: AvatarInterface, player: AvatarInterface, hotspotDistance?: number, callback?: (inHotspot: boolean) => void): void;
export declare function IsHotspot(mesh1Postion: BABYLON.Vector3, mesh2Postion: BABYLON.Vector3, hotspotDistance?: number): boolean;
