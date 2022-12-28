// import { AxiosRequestConfig } from 'axios';

interface ParamGetType<T> {
  url: string;
  params?: T;
  acToken?: string;
}
interface ParamPostType<T> {
  url: string;
  body: T;
  acToken?: string;
}
interface ParamPutType<T> {
  url: string;
  body: T;
  acToken?: string;
}
interface ParamPatchType<T> {
  url: string;
  body: T;
  acToken?: string;
}
interface ParamDeleteType {
  url: string;
  acToken?: string;
}

export type {
  ParamGetType,
  ParamPostType,
  ParamPutType,
  ParamPatchType,
  ParamDeleteType,
};
