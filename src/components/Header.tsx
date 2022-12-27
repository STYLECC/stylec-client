import { selectAuthState } from '@/store/authSlice';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Home.module.css';

const Header = () => {
  const userInfo = useSelector(selectAuthState);
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href={'/posts'}>블로그 리스트</Link>
      </div>
      <Link href={'/'}>
        <h2 className={styles.center}>STYLEC</h2>
      </Link>
      <div className={styles.right}>
        {userInfo.isLogin ? (
          <>
            <span>마이페이지</span>
            <span> | </span>
            <span>로그아웃</span>
          </>
        ) : (
          <>
            <span>회원가입</span>
            <span> | </span>
            <Link href={'/auth/login'}>로그인</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
