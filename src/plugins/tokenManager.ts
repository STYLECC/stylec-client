import axios from 'axios';
import cookie from 'react-cookies';

function getToken(key: string) {
  return cookie.load(key);
}

function setToken(accessToken: string, refreshToken: string) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 2);

  cookie.save('accessToken', accessToken, {
    path: '/',
    expires,
    // httpOnly: false, 일반적인 도메인에서만 사용 가능
  });
  cookie.save('refreshToken', refreshToken, {
    path: '/',
    expires,
    // httpOnly: false,
  });
}

export { getToken, setToken };
// ref: https://lemontia.tistory.com/1012
