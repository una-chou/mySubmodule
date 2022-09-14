import * as BABYLON from '@babylonjs/core';
/**
 * 资源接口定义；
 */
export interface AssetInterface {
    /** 加载文件的根目录 */
    rootUrl: string;
    /** 加载文件名称 */
    file: string;
    /** 资源加载完成后会绑定到这个变量上 */
    asset?: BABYLON.AssetContainer;
    /** 默认为0, 数字越大，加载优先级越高 */
    priority?: number;
    /** 加载错误引起的重复加载次数 */
    reload?: number;
}
