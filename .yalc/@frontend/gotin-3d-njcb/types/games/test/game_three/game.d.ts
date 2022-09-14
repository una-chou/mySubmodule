import { Base } from './base';
/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export declare class Game extends Base {
    private _physics;
    /**
     * 创建场景, 并开始渲染；
     */
    constructor(container: HTMLCanvasElement);
    private initBox;
    animate: () => void;
}
