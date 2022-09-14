declare class Game {
    private _scene;
    private _engine;
    private _camera;
    private _boxList;
    private _gui;
    private _guiData;
    constructor(canvas: HTMLCanvasElement);
    start(): void;
    stop(): void;
    private initGround;
    private initlight;
    private creatBox;
    private _computeLenOfCube;
    private _computePosByIndex;
    changeBoxQuantity(size: number): void;
    private initGUI;
    dispose(): void;
}
export { Game };
