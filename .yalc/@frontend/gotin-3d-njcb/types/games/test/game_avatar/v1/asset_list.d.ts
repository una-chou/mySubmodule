import { AssetInterface } from '../../../../modules/asset/v1/asset_interface';
/**
 * 资源列表接口定义；
 */
export interface AssetListInterface {
    avatar: {
        male: AssetInterface;
        female: AssetInterface;
        character: AssetInterface;
    };
    avatar_image: AssetInterface;
}
/**
 * 资源列表；
 */
export declare const AssetList: AssetListInterface;
