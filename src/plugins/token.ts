import axios from 'axios';
import cookie from 'react-cookies';

function getToken(key: string) {
  return cookie.load(key);
}

function setToken(accessToken: string, refreshToken: string) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

  const after2m = new Date();
  after2m.setMinutes(after2m.getMinutes() + 2);

  const after5m = new Date();
  after5m.setMinutes(after5m.getMinutes() + 5);

  cookie.save('accessToken', accessToken, {
    path: '/',
    expires: after2m,
    httpOnly: false,
    secure: true,
  });

  cookie.save('refreshToken', refreshToken, {
    path: '/',
    expires: after5m,
    httpOnly: false, // 일반적인 도메인에서만 사용 가능
    secure: true,
  });
}

function removeToken() {
  cookie.remove('accessToken');
  cookie.remove('refreshToken');
}

export { getToken, setToken, removeToken };
// ref: https://lemontia.tistory.com/1012
