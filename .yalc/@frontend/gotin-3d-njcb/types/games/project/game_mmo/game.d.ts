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
    private _player?;
    private _playerController?;
    private _isStart;
    private _assetManager?;
    private _avatarAsset?;
    private _light;
    private _assetLoadingView?;
    private _socket?;
    private _isLoaded;
    private _isAwaked;
    private _isDebug;
    private _playerId;
    /**
     * 创建场景, 并开始渲染；
     */
    constructor(canvas: HTMLCanvasElement);
    private _awake;
    private _preload;
    private _enter;
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
