import axios, { AxiosRequestConfig } from 'axios';
import createHttp from './create';
export * from './types';

export type httpRequest = AxiosRequestConfig;
const cancelToken = axios.CancelToken;
const http = createHttp();
export {createHttp, cancelToken};
export default http;