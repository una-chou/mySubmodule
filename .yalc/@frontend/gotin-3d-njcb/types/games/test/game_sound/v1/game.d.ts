import '@babylonjs/loaders';
import { GameInterface } from '../../../../games/game_interface';
/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export declare class Game implements GameInterface {
    private _engine;
    private _scene;
    private _isStart;
    constructor(canvas: HTMLCanvasElement);
    onEnter(): void;
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
    attachControl(): void;
    detachControl(): void;
    private _renderLoopHandler;
    private _resizeHandler;
}
