import { AssetInterface } from '../../../modules/asset/v1/asset_interface';
/**
 * 资源列表接口定义；
 */
export interface AssetListInterface {
    skybox: {
        skybox1: AssetInterface;
        skybox2: AssetInterface;
        skybox3: AssetInterface;
    };
    car: {
        car1: {
            model: AssetInterface;
            texture: Record<string, string>;
        };
    };
}
/**
 * 资源列表；
 */
export declare const AssetList: AssetListInterface;
