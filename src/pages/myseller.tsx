import Header from '@/components/Header';
import { selectAuthState, setAuthState } from '@/store/authSlice';
import { wrapper } from '@/store/store';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import { defaultValue, solbi } from '.';
import aartServices from '@/plugins/service';

export default function Myseller() {
  const userInfo = useSelector(selectAuthState);
  return (
    <div>
      <Header />
      <h1>내 셀러 매출 페이지</h1>
      {userInfo.isLogin && <p>사용자명: {userInfo.userName}</p>}
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    console.log('parrams__________before', context);
    const cookie = context.req ? context.req.cookies.accessToken : '';
    aartServices.api.http.accessToken = '';
    // axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      aartServices.api.http.accessToken = cookie;
      // axios.defaults.headers.Authorization = cookie;
      await store.dispatch(setAuthState({ ...solbi, isLogin: true }));
    } else {
      await store.dispatch(setAuthState({ ...defaultValue, isLogin: false }));
    }
    console.log('cookie__________@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(cookie);
    console.log('cookie__________@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    return {
      props: {},
    };
  },
);
