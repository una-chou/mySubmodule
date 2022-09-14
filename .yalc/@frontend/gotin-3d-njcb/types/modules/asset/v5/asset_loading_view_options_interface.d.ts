import { Control } from '@babylonjs/gui';
export interface AssetLoadingViewOptionsItem {
    url: string;
    mobile?: Partial<Control>;
    pc?: Partial<Control>;
}
export interface AssetLoadingViewOptionsInterface {
    loadingSuccessButton: AssetLoadingViewOptionsItem;
    logo: AssetLoadingViewOptionsItem;
    loadingProgressBackground: AssetLoadingViewOptionsItem;
    bottom: AssetLoadingViewOptionsItem;
    progressText: Omit<AssetLoadingViewOptionsItem, 'url'>;
    background: Omit<AssetLoadingViewOptionsItem, 'url'>;
}
