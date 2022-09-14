export declare type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export interface RequestOptions {
    joinParamsToUrl?: boolean;
    formatDate?: boolean;
    isTransformResponse?: boolean;
    isReturnNativeResponse?: boolean;
    joinPrefix?: boolean;
    apiUrl?: string;
    urlPrefix?: string;
    errorMessageMode?: ErrorMessageMode;
    joinTime?: boolean;
    ignoreCancelToken?: boolean;
    withToken?: boolean;
    retryRequest?: RetryRequest;
}
export interface RetryRequest {
    isOpenRetry: boolean;
    count: number;
    waitTime: number;
}
export interface Result<T = any> {
    code: number;
    message: string;
    data: T;
}
