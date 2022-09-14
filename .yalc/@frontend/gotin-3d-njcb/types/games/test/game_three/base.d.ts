import * as THREE from 'three';
/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export declare class Base {
    protected _camera: THREE.PerspectiveCamera | undefined;
    protected _renderer: THREE.WebGLRenderer | undefined;
    private _container;
    protected _scene: THREE.Scene;
    private controls;
    /**
     * 创建场景, 并开始渲染；
     */
    constructor(container: HTMLCanvasElement);
    private initScene;
    private initCamera;
    private initRenderer;
    private initlight;
    private cameraControls;
}
