import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Script from 'next/script';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

declare global {
  interface Window {
    Kakao: any;
  }
}

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const persistor = persistStore(store);

  function kakaoInit() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...props.pageProps} />
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          onLoad={kakaoInit}
        ></Script>
      </PersistGate>
    </Provider>
  );
}

export default App;
