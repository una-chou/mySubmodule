import * as BABYLON from '@babylonjs/core';
import { BasicsNodeList, ConflictNodeMap, ChoiceGroupObj } from './data_interface';
export declare class AvatarManager {
    private _scene;
    _camera: BABYLON.ArcRotateCamera;
    private _basicsNodeList;
    private _conflictNodeMap;
    private _choiceGroupObj;
    constructor(scene: BABYLON.Scene);
    private _createCamera;
    /**
     * 根据id获取模型node
     * @param id
     * @returns
     */
    private _getNode;
    /**
     * 显示模型基础，隐藏所有衣服
     * @param parent 所有衣服父node
     */
    private _initBasicsNode;
    /**
     * 显示隐藏穿模相关node
     * @param id
     * @param show 是否显示
     * @param map 穿模关系映射
     */
    private _setConflictNodeEnabled;
    /**
     * 选择生效或失效
     * @param choice
     * @param on 是否生效
     */
    private _choiceSwitch;
    /**
     * 设置mesh的texture
     * @param mesh
     * @param textureConfig
     */
    private _setTexture;
    /**
     * 更换choice，结构参考ChoiceGroupObj
     * @param part 更换部位
     * @param index 在同一组中的下标
     * @param toggle 是否开启反选
     */
    replaceChoice(part: string, index: number, toggle?: boolean): void;
    /**
     * 上一个choice，结构参考ChoiceGroupObj
     * @param part 更换部位
     */
    prevChoice(part: string): void;
    /**
     * 下一个choice，结构参考ChoiceGroupObj
     * @param part 更换部位
     */
    nextChoice(part: string): void;
    /**
     * 切换角色
     * @param showId 显示角色的id
     * @param hideId 隐藏角色的id
     * @param list
     * @param obj
     * @param map
     */
    replaceAvatar(showId: string, hideId: string, list: BasicsNodeList, obj: ChoiceGroupObj, map?: ConflictNodeMap): void;
}
