import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import { GameInterface } from '../../game_interface';
import { GameOptionsInterface } from '../../game_options_interface';
import { EmitterEvents } from '../../../modules/emitter/emitter_event';
import { ControllerOption } from '@/modules/controller/v3/controller_option';
/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export declare class Game implements GameInterface {
    private _engine;
    private _scene;
    _camera: BABYLON.ArcRotateCamera;
    private _light;
    private _ui;
    private _assetManager?;
    private _assetLoadingView?;
    private _avatarAsset?;
    private _groundAsset?;
    private _interfaceGroundAsset?;
    private _collisionGroundAsset?;
    private _roadFlowMesh?;
    private _fxShowCaseGlow?;
    private _anRacing?;
    private _enterMainVenueAsset?;
    private _viewMoreButtonAsset?;
    private _player?;
    private _playerController?;
    private _raycast?;
    private _isStarted;
    private _isLoaded;
    private _isAwaked;
    private _isAttached;
    private _emitter;
    private _isDebug;
    private _lockStep;
    private _maxSteps;
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
    private _renderLoopStep;
    private _renderLoopDelta;
    private _renderLoopHandler;
    private _resizeHandler;
}
