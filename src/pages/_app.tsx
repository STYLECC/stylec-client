import '../../styles/globals.css';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Script from 'next/script';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import { Context } from 'next-redux-wrapper';
import { getToken } from '@/plugins/TokenManager';
import { setAuthState } from '@/store/authSlice';
import axios from 'axios';

declare global {
  interface Window {
    Kakao: any;
  }
}

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  function kakaoInit() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }

  useEffect(() => {
    const accessToken = getToken('accessToken');
    if (accessToken) {
      store.dispatch(setAuthState(true));
      axios.defaults.headers.Authorization = 'Bearer ' + accessToken;
    } else {
      store.dispatch(setAuthState(false));
      axios.defaults.headers.Authorization = '';
    }
  });

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        onLoad={kakaoInit}
      ></Script>
    </Provider>
  );
}
App.getInitialProps = async (context: Context) => {
  console.log('________________________app________________________');
  console.log(context, 'context');
  console.log('________________________app________________________');
  return {};
};

export default App;
