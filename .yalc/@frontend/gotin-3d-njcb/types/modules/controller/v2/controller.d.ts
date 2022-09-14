import * as BABYLON from '@babylonjs/core';
import { CharacterInterface } from '../../../modules/avatar/v1/character_interface';
import { PLATFORM_ENUM } from '@/modules/platform/platform_enum';
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
    /**
     * 创建角色控制器
     *
     * @param scene
     * @param camera
     * @param player
     * @param platform
     */
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, player: CharacterInterface, platform: PLATFORM_ENUM);
    attachControl(): void;
    detachControl(): void;
    /**
     * 每帧更新
     */
    update(): void;
}
