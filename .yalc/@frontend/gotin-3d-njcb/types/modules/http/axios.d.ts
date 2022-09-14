import type { AxiosRequestConfig } from 'axios';
import { RequestOptions } from './http_type';
import { AxiosTransform } from './axiosTransform';
interface CreateAxiosOptions extends AxiosRequestConfig {
    authenticationScheme?: string;
    transform?: AxiosTransform;
    requestOptions?: RequestOptions;
}
export declare class WAxios {
    private axiosInstance;
    private options;
    constructor(options: CreateAxiosOptions);
    setHeader(headers: any): void;
    private getTransform;
    get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
}
export {};
