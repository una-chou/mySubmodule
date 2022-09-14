import { WAxios } from '../../../../modules/http/axios';
export declare enum ResultEnum {
    SUCCESS = 0,
    ERROR = -1,
    TIMEOUT = 401,
    TYPE = "success"
}
/**
 * @description: request method
 */
export declare enum RequestEnum {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export declare enum ContentTypeEnum {
    JSON = "application/json;charset=UTF-8",
    FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
    FORM_DATA = "multipart/form-data;charset=UTF-8"
}
export declare const defHttp: WAxios;
