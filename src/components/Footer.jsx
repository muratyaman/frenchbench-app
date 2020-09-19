import Link from 'next/link';
import { FbLogo } from './FbLogo';
import styles from './Footer.module.scss';

export function Footer(props) {
  return (
    <div className={styles.footer}>
      <hr />
      <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
          <FbLogo />
        </li>
        <li className={styles.navigationItem}>
          <Link href='/'><span>&copy;{(new Date().getFullYear())} FrenchBench</span></Link>
        </li>
        <li className={styles.navigationItem}>
          <Link href='/terms'>Terms of Service</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link href='/privacy'>Privacy Policy</Link>
        </li>
      </ul>
    </div>
  );
}
