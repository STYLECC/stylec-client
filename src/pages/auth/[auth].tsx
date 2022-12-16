import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { setToken } from '@/plugins/tokenManager';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@/store/authSlice';
import { defaultValue, solbi } from '..';
// import { wrapper } from '@/store/store';
// import { GetServerSidePropsContext } from 'next';

interface ResponseType {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

export default function Auth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth: auth, code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = useCallback(
    async (code: string | string[]) => {
      const response: ResponseType = await fetch(
        'https://api.stylec.co.kr:4886/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            provider: 'kakao',
            code: code,
          }),
        },
      ).then((res) => {
        console.log(res);
        return res.json();
      });

      if (response.success) {
        // 성공하면 홈으로 리다이렉트
        if (response.data) {
          setToken(response.data.accessToken, response.data.refreshToken);
          dispatch(setAuthState({ ...solbi, isLogin: true }));
        }
        router.push('/');
      } else {
        // 실패하면 에러 페이지로 리다이렉트
        alert('실패 ㅠㅜ');
        dispatch(setAuthState({ ...defaultValue, isLogin: false }));
      }
    },
    [router],
  );

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);
    } else if (kakaoServerError) {
      // 에러 페이지로 이동
      router.push('/');
    }
  }, [auth]);

  return (
    <div>
      <main>
        <h1>Welcome to STYLE C</h1>
        <h1>~로그인 중 입니다~</h1>
        <p>인가코드 : {authCode}</p>
      </main>
    </div>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context: GetServerSidePropsContext) => {
//     console.log(
//       '!!!!!!!!!!!!!!!!!!!cookie__________@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
//     );
//     console.log('parrams__________before', context.req);
//     console.log(
//       '!!!!!!!!!!!!!!!!!!!cookie__________@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
//     );
//     // const cookie = context.req ? context.req.cookies.accessToken : '';
//     // console.log();
//     // axios.defaults.headers.Cookie = '';
//     // if (context.req && cookie) {
//     //   aartServices.api.http.accessToken = cookie;
//     //   // axios.defaults.headers.Authorization = cookie;
//     //   await store.dispatch(setAuthState({ ...solbi, isLogin: true }));
//     // } else {
//     //   await store.dispatch(setAuthState({ ...defaultValue, isLogin: false }));
//     // }
//     // console.log('cookie__________@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
//     // console.log(cookie);
//     // console.log('cookie__________@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

//     return {
//       props: {},
//     };
//   },
// );
