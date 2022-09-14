import { Scene as ThreeScene, Camera } from 'three';
import { WebGLRenderer } from '../renderer/webgl_renderer';
export declare class Scene extends ThreeScene {
    constructor(engine: WebGLRenderer);
    private _engine;
    private _camera;
    private _currentCamera;
    private _afterRenderList;
    private _beforeRenderList;
    addCamera(camera: Camera): void;
    getEngine(): WebGLRenderer;
    setCurrentCamera(camera: Camera): void;
    getCurrentCamera(): Camera | undefined;
    removeCamera(camera: Camera): void;
    dispose(): void;
    registerAfterRender(callback: () => void): void;
    unregisterAfterRender(callback: () => void): void;
    registerBeforeRender(callback: () => void): void;
    unregisterBeforeRender(callback: () => void): void;
    getBeforeRenderList(): Array<() => void>;
    getAfterRenderList(): Array<() => void>;
}
