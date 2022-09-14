import * as BABYLON from '@babylonjs/core';
import { AvatarInterface } from '../../../modules/avatar/v2/avatar_interface';
interface playerObj {
    id: string;
    position: BABYLON.Vector3;
    rotation: BABYLON.Vector3;
    type: number;
    animationState: string;
    isFirstEntry: boolean;
}
export declare class SocketDataProcessing {
    player: AvatarInterface | undefined;
    playerId: number | undefined;
    private _scene;
    private _animationStateMachine?;
    private _asset;
    constructor(scene: BABYLON.Scene);
    setAvatarAsset(avatarAsset: BABYLON.AssetContainer): void;
    setPlayerMessage(message: playerObj): void;
}
export {};
