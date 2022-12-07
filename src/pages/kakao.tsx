import styles from '../../styles/Home.module.css';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { setToken } from '@/plugins/TokenManager';

interface ResponseType {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

export default function Kakao() {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

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
      ).then((res) => res.json());

      if (response.success) {
        // 성공하면 홈으로 리다이렉트
        if (response.data) {
          setToken(response.data.accessToken, response.data.refreshToken);
        }
        router.push('/');
      } else {
        // 실패하면 에러 페이지로 리다이렉트
        alert('실패 ㅠㅜ');
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
  }, [loginHandler, authCode, kakaoServerError, router]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Welcome to STYLE C</h1>
        <h1>~로그인 중 입니다~</h1>
        <p>인가코드 : {authCode}</p>
      </main>
    </div>
  );
}
