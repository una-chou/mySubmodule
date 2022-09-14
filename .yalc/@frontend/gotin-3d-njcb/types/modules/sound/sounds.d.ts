import * as BABYLON from '@babylonjs/core';
export declare class SoundUtil {
    private constructor();
    private static _cache;
    private static _currentBGM;
    static isBackgroundMusicPlaying(): boolean;
    static playSoundEffect(name: string): void;
    static playBackgroundMusic(name: string): void;
    static stopBackgroundMusic(): void;
    static pauseBackgroundMusic(): void;
    /**
     * 释放全部音乐音效
     */
    static clear(): void;
    /**
     * 加载音效 （音效不需要循环播放）
     * @param name
     * @param path
     */
    static loadSoundEffect(name: string, path: string): void;
    /**
     * 加载背景音乐 （背景音乐需要循环播放）
     * @param name
     * @param path
     */
    static loadBackgroundMusic(name: string, path: string, readyToPlayCallback?: BABYLON.Nullable<() => void>): void;
    private static _getSoundEffect;
    /**
     * 设置全局音量
     * @param volume 0 ~ 1.0
     */
    static setVolume(volume: number): void;
    /**
     * 获取全局音量
     * @returns 正常：0 ～ 1.0;异常：-1
     */
    static getVolume(): number;
}
