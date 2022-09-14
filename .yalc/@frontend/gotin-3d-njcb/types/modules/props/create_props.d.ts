import * as BABYLON from '@babylonjs/core';
import { PROP_TYPE_ENUM } from './props_enum';
import { PropsInterface } from './props_interface';
/**
 * 创建一个道具盒子；
 *
 * @param scene
 * @param text
 * @returns
 */
export declare function CreateProps(scene: BABYLON.Scene, text: string, size: BABYLON.Vector3): PropsInterface;
export declare class PropModel {
    name: string;
    type: PROP_TYPE_ENUM;
    size: BABYLON.Vector3;
    postion: BABYLON.Vector3;
    constructor(name: string, type: PROP_TYPE_ENUM, postion: BABYLON.Vector3, size: BABYLON.Vector3);
    transformPropInterface(scene: BABYLON.Scene): PropsInterface;
}
