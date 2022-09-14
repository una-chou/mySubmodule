import { AssetInterface } from '../../../../modules/asset/v3/asset_interface';
import * as BABYLON from '@babylonjs/core';
import { NpcConfigInterface } from '../npc/npc_config_interface';
export declare class PorscheProps {
    personArray: BABYLON.TransformNode[];
    buttonArray: BABYLON.TransformNode[];
    private _froumArray;
    movieArray: BABYLON.AbstractMesh[];
    currentViewMoreButtonBindMesh?: BABYLON.AbstractMesh;
    constructor(interfaceGroundAsset: AssetInterface | undefined);
    /**
     * 获取intersect交互的mesh
     * **/
    getIntersectMeshs(): BABYLON.AbstractMesh[];
    transFormNpcInterface(): NpcConfigInterface[];
}
