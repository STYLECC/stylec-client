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
        <Link href={'/myseller'}>내 셀러 매출</Link>
        <span> | </span>
        <span>포인트</span>
        <span> | </span>
        <span>스타일씨캐시</span>
        <span> | </span>
        <span>스타일씨마이샵</span>
        <span> | </span>
        <span>장바구니</span>
      </div>
      <Link href={'/'}>
        <h2 className={styles.center}>STYLEC</h2>
      </Link>

      <div className={styles.right}>
        {userInfo.isLogin ? (
          <>
            <span>위시리스트</span>
            <span> | </span>
            <span>마이페이지</span>
            <span> | </span>
            <span>주문내역</span>
            <span> | </span>
            <span>로그아웃</span>
            <span> | </span>
            <span>고객센터</span>
          </>
        ) : (
          <>
            <span>회원가입</span>
            <span> | </span>
            <Link href={'/auth/login'}>로그인</Link>
            <span> | </span>
            <span>고객센터</span>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
