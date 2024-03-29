import { getToken, setToken } from '@/plugins/token';
import axios, { AxiosError, AxiosInstance } from 'axios';
import {
  ParamGetType,
  ParamPostType,
  ParamPutType,
  ParamPatchType,
  ParamDeleteType,
} from './axios.param.type';

const acToken = getToken('accessToken');

// refreshToken 관련
let isTokenRefreshing = false;
const refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

export default class AxiosHttpService {
  axios: AxiosInstance;
  accessToken?: string;

  constructor() {
    this.accessToken = acToken;

    const _axos = axios.create({
      //   withCredentials: true,
    });

    // 응답 인터셉터 추가
    _axos.interceptors.response.use(
      (response) => {
        // 응답 데이터를 가공
        return response;
      },
      async (error) => {
        const {
          config,
          response: { status },
        } = error;
        if (status === 401) {
          if (!isTokenRefreshing) {
            // isTokenRefreshing이 false인 경우에만 token refresh 요청 (다수의 요청 시 순서를 보장하기 위해)
            isTokenRefreshing = true;
            const refreshToken = getToken('refreshToken');
            const { data } = await _axos.post(
              `http://localhost:3000/refresh/token`, // token refresh api
              {
                refreshToken,
              },
            );
            // 새로운 토큰 저장
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = data;
            setToken(newAccessToken, newRefreshToken);

            isTokenRefreshing = false;
            this.accessToken = newAccessToken;
            // 새로운 토큰으로 지연되었던 요청 진행
            onTokenRefreshed(newAccessToken);
          }
          // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
          const retryOriginalRequest = new Promise((resolve) => {
            addRefreshSubscriber((accessToken: string) => {
              config.headers.Authorization = 'Bearer ' + accessToken;
              resolve(axios(config));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      },
    );

    this.axios = _axos;
  }

  // initConfig = (config: AxiosRequestConfig) => {
  //   const conf = config || {
  //     headers: {},
  //   };
  //   return conf;
  // };

  // Catch Error
  catchError = (err: AxiosError) => {
    console.error(`${err?.response?.status} Error`, err?.response?.data);
    // 에러에 대한 보충 필요
    throw err;
  };

  // Request Get
  requestGet = <T>({ url, params, acToken }: ParamGetType<T>) => {
    console.debug('::: Axios Request Get :::');
    return this.axios({
      method: 'get',
      url,
      params,
      headers: {
        Authorization: acToken ? `Bearer ${acToken}` : '',
      },
    });
  };

  // Request Post
  requestPost = <T>({ url, body, acToken }: ParamPostType<T>) => {
    console.debug('::: Axios Request Post :::');
    return this.axios({
      method: 'post',
      url,
      data: body,
      headers: {
        Authorization: acToken ? `Bearer ${acToken}` : '',
      },
    });
  };

  // Request Put
  requestPut = <T>({ url, body, acToken }: ParamPutType<T>) => {
    console.debug('::: Axios Request Put :::');
    return this.axios({
      method: 'put',
      url,
      data: body,
      headers: {
        Authorization: acToken ? `Bearer ${acToken}` : '',
      },
    });
  };

  // Request Patch
  requestPatch = <T>({ url, body, acToken }: ParamPatchType<T>) => {
    console.debug('::: Axios Request Patch :::');
    return this.axios({
      method: 'patch',
      url,
      data: body,
      headers: {
        Authorization: acToken ? `Bearer ${acToken}` : '',
      },
    });
  };

  // Request Delete
  requestDelete = ({ url, acToken }: ParamDeleteType) => {
    console.debug('::: Axios Request Delete :::');
    return this.axios({
      method: 'delete',
      url,
      headers: {
        Authorization: acToken ? `Bearer ${acToken}` : '',
      },
    });
  };

  // Parse Query String
  parseQuery(params: string) {
    if (typeof params === 'object') {
      return (
        '?' +
        Object.keys(params)
          .reduce(function (a: string[], k) {
            a.push(k + '=' + encodeURIComponent(params[k]));
            return a;
          }, [])
          .join('&')
      );
    } else {
      return '';
    }
  }
}
