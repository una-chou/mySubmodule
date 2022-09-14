import { Scene0 } from './scenes/scene_0/scene_0';
import { Scene1 } from './scenes/scene_1/scene_1';
import { Scene2 } from './scenes/scene_2/scene_2';
import { SceneBasic } from './scenes/scene_basic';
export interface SceneListInterface {
    current: SceneBasic | null;
    scene0: Scene0 | null;
    scene1: Scene1 | null;
    scene2: Scene2 | null;
}
export declare const SceneList: SceneListInterface;
