import { AvatarInterface } from '../../../../modules/avatar/v2/avatar_interface';
import { Controller } from '@/modules/controller/v3/controller';
import * as BABYLON from '@babylonjs/core';
import * as BABYLONGUI from '@babylonjs/gui';
import { Emitter } from '@/modules/emitter/emitter';
import { EmitterEventEnum } from '@/modules/emitter/emitter_event_enum';
import { EmitterEvents } from '@/modules/emitter/emitter_event';
import { PorscheProps } from './prop';
export declare class Raycast {
    private _emitter;
    private _scene;
    private _camera;
    private _ui;
    private _player;
    private _playerController;
    private _pointerObservable?;
    private _npcRecord;
    private _props;
    /**
     * 3D场景中的射线拾取；
     */
    constructor(emitter: Emitter<EmitterEventEnum, EmitterEvents>, scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera, ui: BABYLONGUI.AdvancedDynamicTexture, player: AvatarInterface, playerController: Controller, npcRecord: Record<string, AvatarInterface>, props: PorscheProps);
    /**
     * 绑定射线拾取；
     */
    attachControl(): void;
    /**
     * 解除射线拾取；
     */
    detachControl(): void;
    private _pickHandler;
}
