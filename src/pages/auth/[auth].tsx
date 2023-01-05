import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { setToken } from '@/plugins/token';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@/store/authSlice';
import { solbi } from '../_app';
import aartServices from '@/services/utils/service';

interface loginRes {
  data: {
    success: boolean;
    message: string;
    data?: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export default function Auth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth, code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = useCallback(
    async (code: string | string[]) => {
      const { data }: loginRes = await aartServices.api.auth.login(
        auth as string,
        code as string,
      );

      if (data.success) {
        // 성공하면 홈으로 리다이렉트
        if (data.data) {
          setToken(data.data.accessToken, data.data.refreshToken);
          dispatch(setAuthState({ ...solbi, isLogin: true }));
        }
        router.push('/');
      } else {
        alert('실패 ㅠㅜ');
        dispatch(
          setAuthState({ userName: null, userId: null, isLogin: false }),
        );
        // + 에러 페이지로 이동
      }
    },
    [router],
  );

  useEffect(() => {
    // if (authCode) {
    //   loginHandler(authCode);
    // } else if (kakaoServerError) {
    //   // 에러 페이지로 이동
    //   router.push('/');
    // }
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
