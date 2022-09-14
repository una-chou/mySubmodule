export declare function is(val: any, type: string): boolean;
export declare function isString(val: any): val is string;
export declare function isObject(val: any): val is Record<any, any>;
export declare function isFunction(val: any): boolean;
export declare function deepMerge<T = any>(src?: any, target?: any): T;
