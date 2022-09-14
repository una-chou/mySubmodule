import { AssetInterface } from '../../../modules/asset/v1/asset_interface';
/**
 * 资源列表接口定义；
 */
export interface AssetListInterface {
    player: AssetInterface;
    npc: {
        npc1: AssetInterface;
    };
    props: {
        props1: AssetInterface;
        props2: AssetInterface;
        props3: AssetInterface;
    };
    room: {
        room0: AssetInterface[];
        room1: AssetInterface[];
        room2: AssetInterface[];
        room3: AssetInterface[];
        room4: AssetInterface[];
        room5: AssetInterface[];
    };
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
    image: {
        minimap: AssetInterface;
    };
}
/**
 * 资源列表；
 */
export declare const AssetList: AssetListInterface;
