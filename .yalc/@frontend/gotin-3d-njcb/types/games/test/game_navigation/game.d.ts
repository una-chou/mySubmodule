import '@babylonjs/loaders';
/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export declare class Game {
    private _engine;
    private _scene;
    private _camera;
    private _light;
    /**
     * 创建一个游戏；
     */
    constructor(canvas: HTMLCanvasElement);
    /**
     * 释放场景资源；
     */
    dispose(): void;
    private _pickHandler;
    private _renderLoopHandler;
    private _resizeHandler;
    private _generate;
}
