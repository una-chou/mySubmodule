import { WebGLRenderer as ThrerWebGLRenderer, WebGLRendererParameters } from 'three';
import { Scene } from '../scene/scene';
export declare class WebGLRenderer extends ThrerWebGLRenderer {
    private _handlerList;
    private _pause;
    private _scene;
    private _currentScene;
    private _prevTime;
    private _fps;
    private _destory;
    constructor(parameters?: WebGLRendererParameters | undefined);
    getFps(): number;
    runRenderLoop(handler: () => void): void;
    stopRenderLoop(handler: () => void): void;
    addScene(scene: Scene): void;
    removeScene(scene: Scene): void;
    start(): void;
    stop(): void;
    destory(): void;
    private updateFps;
    private gameRender;
}
