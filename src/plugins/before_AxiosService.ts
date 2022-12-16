import axios from 'axios';
import { getToken, setToken } from './tokenManager';

const customAxios = axios.create();

// 인스턴스가 생성 된 후 기본값 변경
const accessToken = getToken('accessToken');
if (accessToken) {
  customAxios.defaults.headers.common['Authorization'] = accessToken;
} else {
  customAxios.defaults.headers.common['Authorization'] = '';
}

// refreshToken 관련
let isTokenRefreshing = false;
const refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// 요청 인터셉터 추가
customAxios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    // ...
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
customAxios.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공
    // ...
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      if (!isTokenRefreshing) {
        // isTokenRefreshing이 false인 경우에만 token refresh 요청
        isTokenRefreshing = true;
        const refreshToken = getToken('refreshToken');
        const { data } = await customAxios.post(
          `http://localhost:3000/refresh/token`, // token refresh api
          {
            refreshToken,
          },
        );
        // 새로운 토큰 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;
        setToken(newAccessToken, newRefreshToken);

        isTokenRefreshing = false;
        customAxios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
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

export default customAxios;
