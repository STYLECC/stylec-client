import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Script from 'next/script';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getToken } from '@/plugins/token';
import { setAuthState } from '@/store/authSlice';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const solbi = {
  userName: '소르비',
  userId: 123456789,
  imageUrl:
    'https://cdn.stylec.co.kr/data/member_image/na/naver_96260941.gif?v=1670829228',
};

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [queryClient] = React.useState(() => new QueryClient());

  function kakaoInit() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }

  useEffect(() => {
    console.log('useEffect');
    const accessToken = getToken('accessToken');
    if (accessToken) {
      // api 통신으로 유저 정보 받아오기
      store.dispatch(setAuthState({ ...solbi, isLogin: true }));
    } else {
      store.dispatch(
        setAuthState({ userName: null, userId: null, isLogin: false }),
      );
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={props.pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        <Provider store={store}>
          <Component {...props.pageProps} />
          <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            onLoad={kakaoInit}
          ></Script>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
