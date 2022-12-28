import { selectAuthState, setAuthState } from '@/store/authSlice';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Home.module.css';
import { authLogout } from '@/plugins/auth';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectAuthState);
  const router = useRouter();

  const logout = () => {
    authLogout();
    dispatch(setAuthState({ userName: null, userId: null, isLogin: false }));
    router.push('/');
  };

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
            <Link href={'/mypage'}>
              <span>마이페이지</span>
            </Link>
            <span> | </span>
            <span onClick={logout}>로그아웃</span>
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
