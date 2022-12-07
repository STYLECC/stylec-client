import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {' '}
        나는 컴포넌트입니다.
        <br />
        Signed in as {session.user.email} <br />{' '}
        <button
          onClick={() =>
            signOut('kakao', { callbackUrl: '/api/auth/callback/kakao' })
          }
        >
          Kakao Sign out
        </button>
      </>
    );
  }
  return (
    <>
      {' '}
      나는 컴포넌트입니다.
      <br />
      Not signed in <br />{' '}
      <button
        onClick={() =>
          signIn('kakao', { callbackUrl: '/api/auth/callback/kakao' })
        }
      >
        Kakao Sign in
      </button>
    </>
  );
}
