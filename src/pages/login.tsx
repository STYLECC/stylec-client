import React from 'react';
import Head from 'next/head';
import LoginBtn from 'src/components/login-btn';
import styles from '../../styles/Home.module.css';

export default function LoginPage() {
  //   const loginFormWithKakao = () => {
  //     window.Kakao.Auth.authorize({
  //       redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  //     });
  //   };
  return (
    <div className={styles.container}>
      <Head>
        <title>스타일씨 로그인</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>로그인 하는 페이지에요</h1>
        <LoginBtn></LoginBtn>
      </main>
    </div>
  );
}
