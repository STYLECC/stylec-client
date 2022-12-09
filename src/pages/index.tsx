import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '@/store/authSlice';
import { wrapper } from '@/store/store';
import { getToken } from '@/plugins/TokenManager';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Context } from 'next-redux-wrapper';
import { AppContext } from 'next/app';

export default function Home() {
  const { authState } = useSelector(selectAuthState);
  console.log(authState);
  const dispatch = useDispatch();

  const loginFormWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    });
  };

  const loginFormWithKakao2 = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>스타일씨 [STYLE C]</title>
        <meta name="description" content="스타일씨 [STYLE C] 공식 스토어" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/imgs/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/imgs/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/imgs/favicon/favicon-16x16.png"
        />
      </Head>

      <main className={styles.main}>
        <h1>{authState ? '로그인 성공' : '아직 로그인 안했어요'}</h1>
        <button
          onClick={() =>
            authState
              ? dispatch(setAuthState(false))
              : dispatch(setAuthState(true))
          }
        >
          {authState ? 'Logout' : 'LogIn'}
        </button>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <h2>javascript 방식</h2>
        <button onClick={loginFormWithKakao}>카카오 로그인</button>
        <h2>rest api 방식</h2>
        <button onClick={loginFormWithKakao2}>카카오 로그인</button>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context: Context) => {
    console.log('______________________indexx________________________');
    console.log(context, 'context indexx');
    console.log('______________________indexx________________________');
    // const cookie = context.req ? context.req.headers.cookie : '';
    // await store.dispatch(setAuthState(true));
    return {
      props: {}, // will be passed to the page component as props
    };
  });

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ params }) => {
//       console.log(params);
//       // we can set the initial state from here
//       // we are setting to false but you can run your custom logic here
//       const token = getToken('accessToken');
//       if (token) {
//         axios.defaults.headers.Authorization = 'Bearer ' + token;
//       } else {
//         axios.defaults.headers.Authorization = '';
//       }
//       // await store.dispatch(setAuthState(false));
//       console.log('State on server', store.getState());
//       return {
//         props: {
//           authState: true,
//         },
//       };
//     },
// );
