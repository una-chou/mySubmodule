import { AssetInterface } from '../../../modules/asset/v1/asset_interface';
/**
 * 资源列表接口定义；
 */
export interface AssetListInterface {
    avatar: {
        model: AssetInterface;
        texture: string;
    };
    ground: AssetInterface[];
}
/**
 * 资源列表；
 */
export declare const AssetList: AssetListInterface;
