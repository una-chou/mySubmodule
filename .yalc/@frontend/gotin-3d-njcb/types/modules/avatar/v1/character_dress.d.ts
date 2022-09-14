import * as BABYLON from '@babylonjs/core';
export interface CharacterSuit {
    GetDressSet(): Array<string>;
}
export declare class MaleSuit implements CharacterSuit {
    modelName: string;
    dressSet: Array<string>;
    GetDressSet(): Array<string>;
    static GetDefaultSuit(): MaleSuit;
}
export declare class FemaleSuit implements CharacterSuit {
    modelName: string;
    dressSet: Array<string>;
    GetDressSet(): Array<string>;
    static GetDefaultSuit(): FemaleSuit;
}
export declare function DressUpDefaultSuit(isMale: boolean, container: BABYLON.AssetContainer): void;
