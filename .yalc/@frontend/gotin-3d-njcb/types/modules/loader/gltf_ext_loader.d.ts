import { ISceneLoaderPluginAsync, Scene, ISceneLoaderProgressEvent, WebRequest, LoadFileError, IFileRequest, ISceneLoaderPluginExtensions, ISceneLoaderPlugin } from '@babylonjs/core';
import { GLTFFileLoader } from '@babylonjs/loaders';
/**
 * 扩展GLTFFileLoader，加载并解密.ext1文件
 *
 * TODO: 1.支持'useArrayBuffer'; 2.支持glb文件
 */
export declare class GLTFFileLoaderExt1 extends GLTFFileLoader {
    name: string;
    extensions: ISceneLoaderPluginExtensions;
    loadFile(scene: Scene, fileOrUrl: string | File, onSuccess: (data: any, responseURL?: string | undefined) => void, onProgress?: ((ev: ISceneLoaderProgressEvent) => void) | undefined, useArrayBuffer?: boolean | undefined, onError?: ((request?: WebRequest | undefined, exception?: LoadFileError | undefined) => void) | undefined): IFileRequest;
    createPlugin(): ISceneLoaderPlugin | ISceneLoaderPluginAsync;
}
