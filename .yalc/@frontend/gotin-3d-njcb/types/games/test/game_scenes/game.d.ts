import '@babylonjs/loaders';
/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export declare class Game {
    private _engine;
    private _isStart;
    /**
     * 创建场景, 并开始渲染；
     */
    constructor(canvas: HTMLCanvasElement);
    /**
     * 释放场景资源；
     */
    dispose(): void;
    /**
     * 开始渲染；
     */
    start(): void;
    /**
     * 停止渲染；
     */
    stop(): void;
    private _renderLoopHandler;
    private _resizeHandler;
}
