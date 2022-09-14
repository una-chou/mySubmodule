import { SceneBasic } from '../scene_basic';
/**
 * 这个类用来创建一个场景，并进行场景内元素的调度；
 *
 * @param engine
 */
export declare class Scene2 extends SceneBasic {
    configDataSource(): string[];
    awake(): Promise<void>;
}
