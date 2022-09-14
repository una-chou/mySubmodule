import { AssetContainer } from '@babylonjs/core';
import * as BABYLON from '@babylonjs/core';
import { AvatarInterface } from '../../../modules/avatar/v2/avatar_interface';
export declare class Socket {
    _ws: WebSocket | undefined;
    player: AvatarInterface | undefined;
    playerId: string | undefined;
    asset: AssetContainer | undefined;
    private _scene;
    private _animationStateMachine?;
    private _socketDataProcessing;
    constructor(scene: BABYLON.Scene);
    getPlayerId(): string | undefined;
    setPlayer(player: AvatarInterface, animationState: string, isFirstEntry?: boolean): void;
    setAvatarAsset(avatarAsset: BABYLON.AssetContainer): void;
}
