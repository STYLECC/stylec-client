import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    Kakao: any;
  }
}

function App({ Component, pageProps }: AppProps) {
  function kakaoInit() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }

  return (
    <>
      <Component {...pageProps} />
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        onLoad={kakaoInit}
      ></Script>
    </>
  );
}

export default App;
