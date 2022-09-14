import { AssetContainer } from '@babylonjs/core';
import { AssetInterfaceNew, LOAD_ASSET_PRIORITY } from './asset_interface';
export declare class AssetModel implements AssetInterfaceNew {
    fileName: string;
    filePath: string;
    lowFilePath?: string;
    babylonAssetContainer?: AssetContainer;
    loadPriority: LOAD_ASSET_PRIORITY;
    constructor(fileName: string, loadPriority?: LOAD_ASSET_PRIORITY);
    /**
     * 获取资源完整的下载路径
     * isLow ture = 低模; false = 高模
     */
    getWholeAssetDownloadPath(isLow?: boolean): string;
    private configFilePath;
}
