import { AssetContainer } from '@babylonjs/core';
import { AssetInterfaceNew } from './asset_interface';
export declare class AssetModel implements AssetInterfaceNew {
    fileName: string;
    filePath: string;
    lowFilePath?: string;
    babylonAssetContainer?: AssetContainer;
    constructor(fileName: string);
    /**
     * 获取资源完整的下载路径
     * isLow ture = 低模; false = 高模
     */
    getWholeAssetDownloadPath(isLow: boolean): string;
    private configFilePath;
}
