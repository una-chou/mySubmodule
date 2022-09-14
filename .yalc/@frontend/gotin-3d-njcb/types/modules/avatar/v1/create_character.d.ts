import * as BABYLON from '@babylonjs/core';
import { CharacterInterface } from './character_interface';
/**
 * 创建一个胶囊体人物；
 *
 * @param scene
 * @param text
 * @returns
 */
export declare function CreateCharacter(scene: BABYLON.Scene, text: string, asset: BABYLON.AssetContainer | null, boundingBoxColor: BABYLON.Color3): CharacterInterface;
