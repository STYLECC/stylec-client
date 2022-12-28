import Header from '@/components/Header';
import { selectAuthState } from '@/store/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Mypage() {
  const userInfo = useSelector(selectAuthState);

  return (
    <div>
      <Header />
      <h1>마이페이지</h1>
      <p>사용자명: {userInfo.userName}</p>
      <h2>{userInfo.userId}</h2>
      <h2>{userInfo.userName}</h2>
      <img src={userInfo.imageUrl ? userInfo.imageUrl : ''} alt="이미지" />
    </div>
  );
}
