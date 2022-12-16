import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Script from 'next/script';
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

declare global {
  interface Window {
    Kakao: any;
  }
}

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const persistor = persistStore(store);
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1 * 60 * 60 * 1000,
            cacheTime: 5 * 60 * 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  function kakaoInit() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={props.pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Component {...props.pageProps} />
            <Script
              src="https://developers.kakao.com/sdk/js/kakao.js"
              onLoad={kakaoInit}
            ></Script>
          </PersistGate>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;
