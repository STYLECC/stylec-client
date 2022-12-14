import { getToken, setToken } from '@/plugins/tokenManager';
/**
 * Axios Service
 * Deokin 2019.1.24
 * */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  ParamGetType,
  ParamPostType,
  ParamPutType,
  ParamPatchType,
  ParamDeleteType,
} from './AxiosParam.type';

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

export default class AxiosService {
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

  initConfig(config: AxiosRequestConfig) {
    const conf = config || {
      headers: {},
    };
    return conf;
  }

  // Catch Error (implement)
  catchError(err: AxiosError) {
    console.error(`${err?.response?.status} Error`, err?.response?.data);
    // 에러에 대한 보충 필요
    throw err;
  }

  // Request Get (implement)
  requestGet({ url, config }: ParamGetType) {
    console.debug('::: Axios Request Get :::');
    return this.axios
      .get(url, config && this.initConfig(config))
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        this.catchError(err);
      });
  }

  // Request Post (implement)
  requestPost<T>({ url, body, config }: ParamPostType<T>) {
    console.debug('::: Axios Request Post :::');
    return this.axios
      .post(url, body, this.initConfig(config))
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        this.catchError(err);
      });
  }

  // Request Put (implement)
  requestPut<T>({ url, body, config }: ParamPutType<T>) {
    console.debug('::: Axios Request Put :::');
    return this.axios
      .put(url, body, this.initConfig(config))
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        this.catchError(err);
      });
  }

  // Request Patch (implement)
  requestPatch<T>({ url, body, config }: ParamPatchType<T>) {
    console.debug('::: Axios Request Patch :::');
    return this.axios
      .patch(url, body, this.initConfig(config))
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        this.catchError(err);
      });
  }

  // Request Delete (implement)
  requestDelete({ url, config }: ParamDeleteType) {
    console.debug('::: Axios Request Delete :::');
    return this.axios
      .delete(url, this.initConfig(config))
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        this.catchError(err);
      });
  }

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
