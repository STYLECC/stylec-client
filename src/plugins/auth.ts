import { removeToken } from './token';
// 로그인 함수 추가 예정

const authLogin = () => {
  console.log('로그인 추가 예정');
};

const authLogout = () => {
  // + 로그아웃을 api를 통해서 하는 경우도 있음
  removeToken();
};

export { authLogin, authLogout };
