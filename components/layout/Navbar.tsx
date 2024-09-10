// import Link from 'next/link';

import styles from '@/styles/components/layout/Navbar.module.scss';
// import { useAuth } from '@/context/AuthContext';

/**
 *
 * 元件描述
 * @param param1 參數1說明
 * @param param2 參數2說明
 * @returns 元件名稱
 *
 * @since 1.0.0
 */

export default function Navbar() {
  // const router = useRouter();
  // const { authority } = useAuth();

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   router.push('/login');
  // };

  return (
    // authority !== 'ROLE_ANONYMOUS' && authority !== '' ?
    <>
      <nav className={styles.nav}>

      </nav>
    </>
  );
}