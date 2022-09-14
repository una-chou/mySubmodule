export interface AvatarAssetOptionInterface {
    meshList: string[];
    staticMaterial: string[];
    dynamicMaterial: string[];
    textureMap?: Record<string, {
        u: number;
        v: number;
    }>;
}
