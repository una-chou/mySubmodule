import * as THREE from 'three';
/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export declare class Base {
    protected camera: THREE.PerspectiveCamera | undefined;
    protected renderer: THREE.WebGLRenderer | undefined;
    private container;
    protected scene: THREE.Scene;
    private controls;
    /**
     * 创建场景, 并开始渲染；
     */
    constructor(container: HTMLCanvasElement);
    private onWindowResize;
    private initScene;
    private initCamera;
    private initRenderer;
    private initlight;
    private cameraControls;
}
/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export declare class Game extends Base {
    private _gui;
    private _guiData;
    private _boxList;
    /**
     * 创建场景, 并开始渲染；
     */
    constructor(container: HTMLCanvasElement);
    private initGround;
    private creatBox;
    animate: () => void;
    changeBoxQuantity(size: number): void;
    private _computePosByIndex;
    private _computeLenOfCube;
    private initGUI;
    dispose(): void;
}
