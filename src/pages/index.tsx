import styles from '../../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to STYLEC</h1>
        <div style={{ fontSize: '2em', marginTop: '10px' }}>
          <Link href="/login">login</Link>
        </div>
      </main>
    </div>
  );
}
