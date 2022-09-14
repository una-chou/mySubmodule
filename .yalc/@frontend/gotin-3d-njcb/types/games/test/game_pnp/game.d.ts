import '@babylonjs/loaders';
import { GameInterface } from '../../game_interface';
/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export declare class Game implements GameInterface {
    private _engine;
    private _scene;
    private _camera;
    private _ui;
    private _assetManager;
    private _player;
    private _playerController;
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
    /**
     * 绑定输入控制；
     */
    attachControl(): void;
    /**
     * 卸载输入控制；
     */
    detachControl(): void;
    private _renderLoopHandler;
    private _resizeHandler;
}
