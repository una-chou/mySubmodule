import * as BABYLON from '@babylonjs/core';
export declare class ControllerAttribute {
    /**
     * 角色行走速度,单位m/s
     */
    walkSpeed: number;
    /**
     * 角色跑步速度,单位m/s
     */
    runSpeed: number;
    /**
     * 移动点和角色当前位置距离临界值,单位m
     */
    distanceLimit: number;
    /**
     * 俯角默认值
     */
    betaDefault: number;
    /**
     * 俯角最大值
     */
    betaMax: number;
    /**
     * 仰角最大值
     */
    betaMin: number;
    /**
     * 镜头和人中心的距离默认值,单位m
     */
    cameraDistDefault: number;
    /**
     * 镜头和人中心的距离最大值,单位m
     */
    cameraMaxDist: number;
    /**
     * 镜头和人中心的距离最小值,单位m
     */
    cameraMinDist: number;
    /**
     * 视角旋转速度, 值越小速度越快
     */
    angularSensibility: number;
    /**
     * 镜头中心和人中心距离变化速度
     */
    zoomInOutSpeed: number;
    /**
     * 镜头中心和人中心y方向偏移值
     */
    yOffset: number;
    /**
     * 镜头跟随player动画速度 越小越慢
     * **/
    cameraFollowAmount: number;
    /**
     * 建筑遮挡物透明度
     */
    houseOpacity: number;
    /**
     * 建筑遮挡物列表
     */
    houseObstacleList: string[];
    constructor(option?: Partial<ControllerAttribute>);
}
export interface CameraState {
    alpha?: number;
    beta?: number;
    radius?: number;
    target?: BABYLON.AbstractMesh | BABYLON.Vector3;
}
