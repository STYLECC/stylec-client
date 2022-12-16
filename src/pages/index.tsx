import Head from 'next/head';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '@/store/authSlice';
import { selectCountState, increment } from '@/store/countSlice';
import aartServices from '@/plugins/service';
import axios from 'axios';
import Header from '@/components/Header';
import { wrapper } from '@/store/store';
import { GetServerSidePropsContext } from 'next';

export const solbi = {
  userName: '소르비',
  userId: '123456789',
  imageUrl:
    'https://cdn.stylec.co.kr/data/member_image/na/naver_96260941.gif?v=1670829228',
};

export const defaultValue = {
  userName: '',
  userId: '',
  imageUrl: '',
};

export default function Home() {
  const userInfo = useSelector(selectAuthState);
  const { count } = useSelector(selectCountState);

  const dispatch = useDispatch();

  // api 통신 테스트
  const getCustom = async () => {
    const response = await aartServices.api.test.blogs();
    console.log(response);
  };

  const getFetch = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_page=${1}&_limit=10',
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    console.log(data);
  };

  const getAxios = async () => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts?_page=${1}&_limit=10',
    );
    console.log(response);
  };

  return (
    <div>
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

      <main>
        <Header />
        <br />
        <button onClick={getCustom}>get 요청 보내기~~ custom</button>
        <button onClick={getFetch}>get 요청 보내기~~ fetch</button>
        <button onClick={getAxios}>get 요청 보내기~~ axios</button>
        <br />
        <button onClick={() => dispatch(increment())}>{count}</button>
        <br />
        {userInfo.isLogin && (
          <>
            <h1>{userInfo.isLogin ? '로그인 성공' : '아직 로그인 안했어요'}</h1>
            <h2>{userInfo.userId}</h2>
            <h2>{userInfo.userName}</h2>
            <img src={userInfo.imageUrl} alt="이미지" />
          </>
        )}
        <br />
      </main>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    console.log('parrams__________beffdfsdfdore', context.req.headers);
    console.log(
      'cookie__________@!!!!fdsfsdfsdfsdfd!!!!!!!!!!!!!!!!!!!!!!!!!!',
    );
    const cookie = context.req ? context.req.cookies.accessToken : '';
    aartServices.api.http.accessToken = '';
    // aartServices.api.http.initConfig({
    //   headers: {
    //     Cookie: '',
    //   },
    // });
    // axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      aartServices.api.http.accessToken = cookie;
      // axios.defaults.headers.Authorization = cookie;
      await store.dispatch(setAuthState({ ...solbi, isLogin: true }));
    } else {
      await store.dispatch(setAuthState({ ...defaultValue, isLogin: false }));
    }
    // console.log('cookie__________@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    // console.log(cookie);
    // console.log('cookie__________@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    return {
      props: {},
    };
  },
);
