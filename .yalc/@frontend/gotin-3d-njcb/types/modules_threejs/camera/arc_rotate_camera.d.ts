import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Scene } from '../scene/scene';
declare class ArcRotateCamera extends PerspectiveCamera {
    controls: OrbitControls;
    constructor(scene: Scene, fov: number, aspect: number, near: number, far: number);
}
export { ArcRotateCamera };
