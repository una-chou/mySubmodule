import { GameOptionsInterface } from '../../game_options_interface';
import { EmitterEvents } from '../../../modules/emitter/emitter_event';
import { GameInterface } from '../../game_interface';
/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export declare class Game implements GameInterface {
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
    attachControl(): void;
    /**
     * 卸载输入控制；
     */
    detachControl(): void;
    private _renderLoopHandler;
}
