import { AvatarInterface } from '../../../../modules/avatar/v2/avatar_interface';
import * as BABYLON from '@babylonjs/core';
/**
 * 点击npc时镜头变化动画；
 */
export declare function LookatNpcAnimation(npc: AvatarInterface, player: AvatarInterface, camera: BABYLON.ArcRotateCamera, onStart?: () => void, onComplete?: () => void, onUpdate?: () => void): void;
/**
 * npc头顶图标放大动画
 * @param mesh
 */
export declare function NpcTitleViewBigAnimation(mesh: BABYLON.Mesh): void;
/**
 * npc头顶图标缩小动画
 * @param mesh
 */
export declare function NpcTitleViewSmallAnimation(mesh: BABYLON.Mesh): void;
