import Head from 'next/head';

import styles from '@/styles/components/layout/Layout.module.scss';
// import Navbar from './Navbar';

/**
 *
 * 所有畫面的共同布局
 * @returns 共用布局
 *
 * @since 1.0.0
 */

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Medimate虛擬人介面</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar/> */}
      <main className={styles.layout}>
        <article className={styles.chill}>
          {children}
        </article>
      </main>
    </>
  );
}