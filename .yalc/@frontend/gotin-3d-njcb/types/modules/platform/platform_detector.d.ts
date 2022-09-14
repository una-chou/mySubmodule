export declare const PlatformDetector: {
    /**
     * 操作系统；
     */
    os: string | undefined;
    osVersion: string | undefined;
    osArchitecture: string;
    /**
     * 浏览器；
     */
    browser: string | undefined;
    browserVersion: string | undefined;
};
export declare class PlatformUtil {
    static isMobile(): boolean;
    static isAndroid(): boolean;
    static isIOS(): boolean;
}
