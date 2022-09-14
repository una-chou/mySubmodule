declare class Game {
    private _scene;
    private _engine;
    private _camera;
    constructor(canvas: HTMLCanvasElement);
    start(): void;
    stop(): void;
    private _preLoad;
    dispose(): void;
}
export { Game };
