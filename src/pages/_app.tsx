import React from 'react';
import Head from 'next/head';
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';

import { SessionProvider } from 'next-auth/react';

declare global {
  interface Window {
    Kakao: any;
  }
}

function App({ Component, pageProps }: AppProps) {
  function kakaoInit() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    console.log(window.Kakao.isInitialized());
  }

  return (
    <>
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
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        onLoad={kakaoInit}
      ></Script>
    </>
  );
}

export default App;
