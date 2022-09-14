import * as BABYLON from '@babylonjs/core';
import { AvatarInterface } from '../../../../modules/avatar/v2/avatar_interface';
import { PorscheProps } from './prop';
import { AssetInterface } from '@/modules/asset/v3/asset_interface';
export declare const mainVenueNameString = "Button_EnterMainVenue_Mask";
export declare const mainVenueButtonNameString = "Button_EnterMainVenue_Button";
export declare const viewMoreButtonNameString = "Button_ViewMore";
export declare function CreateIntersectProp(scene: BABYLON.Scene, player: AvatarInterface, enterMainVenueAsset: AssetInterface | undefined, viewMoreButtonAsset: AssetInterface | undefined, props: PorscheProps): void;
