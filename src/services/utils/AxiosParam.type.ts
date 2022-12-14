import { AxiosRequestConfig } from 'axios';

interface ParamGetType {
  url: string;
  config?: AxiosRequestConfig;
}
interface ParamPostType<T> {
  url: string;
  body: T;
  config: AxiosRequestConfig;
}
interface ParamPutType<T> {
  url: string;
  body: T;
  config: AxiosRequestConfig;
}
interface ParamPatchType<T> {
  url: string;
  body: T;
  config: AxiosRequestConfig;
}
interface ParamDeleteType {
  url: string;
  config: AxiosRequestConfig;
}

export type {
  ParamGetType,
  ParamPostType,
  ParamPutType,
  ParamPatchType,
  ParamDeleteType,
};
