import React from 'react';
import Header from '@/components/Header';

export default function Login() {
  const loginFormWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    });
  };

  const loginFormWithKakao2 = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
  };

  return (
    <div>
      <Header />
      <br />
      <h1>로그인 페이지</h1>
      <h2>javascript 방식</h2>
      <button onClick={loginFormWithKakao}>카카오 로그인</button>
      <h2>rest api 방식</h2>
      <button onClick={loginFormWithKakao2}>카카오 로그인</button>
    </div>
  );
}
