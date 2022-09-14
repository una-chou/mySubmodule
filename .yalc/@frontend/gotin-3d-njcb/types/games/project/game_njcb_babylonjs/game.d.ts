import '@babylonjs/loaders';
import { GameInterface } from '../../game_interface';
import { GameOptionsInterface } from '../../game_options_interface';
import { EmitterEvents } from '../../../modules/emitter/emitter_event';
import { ControllerOption } from '@/modules/controller/v4/controller_option';
/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export declare class Game implements GameInterface {
    private _engine;
    private _scene;
    private _camera;
    private _light;
    private _ui;
    private _assetManager?;
    private _avatarAsset?;
    private _showGroundAsset?;
    private _interactGroundAsset?;
    private _collisionGroundAsset?;
    private _player?;
    private _playerController?;
    private _minimap?;
    private _isStarted;
    private _isLoaded;
    private _isAwaked;
    private _isAttached;
    private _emitter;
    private _isDebug;
    /**
     * 创建场景, 默认启动游戏；
     */
    constructor(canvas: HTMLCanvasElement, options?: GameOptionsInterface<EmitterEvents>);
    private _preload;
    private _awake;
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
    /**
     * 绑定输入控制；
     */
    attachControl(option?: ControllerOption): void;
    /**
     * 卸载输入控制；
     */
    detachControl(): void;
    private _renderLoopHandler;
    private _resizeHandler;
}
