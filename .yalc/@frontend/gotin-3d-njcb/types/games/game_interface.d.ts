/**
 * 游戏主入口, 用来控制和调度游戏内的各个场景；
 */
export interface GameInterface {
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
}
