import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Kakao() {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  useEffect(() => {
    if (authCode) {
      console.log(authCode);
    } else if (kakaoServerError) {
      router.push('/');
    }
  }, [authCode, kakaoServerError, router]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to STYLE C</h1>
        <h1 className={styles.title}>~로그인 중~</h1>
        <p>인가코드 : {authCode}</p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
