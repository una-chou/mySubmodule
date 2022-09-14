import * as BABYLON from '@babylonjs/core';
import { ControllerAttribute, CameraState } from './controllerAttribute';
import { AvatarInterface } from '../../../modules/avatar/v2/avatar_interface';
import { ControllerOption } from './controller_option';
export declare class Controller {
    private _scene;
    private _camera;
    private _player;
    private _platform;
    private _pointController?;
    private _keyboardController?;
    private _cameraController?;
    private _locateBox;
    private _animationState?;
    private _isEnabledUpdate;
    _controlAttribute: Partial<ControllerAttribute>;
    /**
     * 创建角色控制器
     *
     * @param scene
     * @param camera
     * @param player
     * @param platform
     */
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, player: AvatarInterface, config?: Partial<ControllerAttribute>);
    attachControl(option?: ControllerOption): void;
    detachControl(): void;
    /**
     * 每帧更新
     */
    private _updateHandler;
    getCameraState(): CameraState | undefined;
    getDefaultCameraState(): ControllerAttribute;
    setCameraState(state: CameraState): void;
    checkObstacleAndProcess(): void;
    stopPlayer(): void;
}
