import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type httpRequest = AxiosRequestConfig;

export interface createOption extends httpRequest {
    requestInterceptor?: ( config: httpRequest ) => httpRequest;
    responseInterceptor?: <T = any>(res: AxiosResponse) => T;
}
