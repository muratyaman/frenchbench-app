import styles from './footer.module.css';

const Footer = () => (
  <div className={styles.footer}>
    <hr />
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <img src='/assets/frenchbench-logo-small.jpg' alt='frenchbench logo small' width='64' />
      </li>
      <li className={styles.navigationItem}>
        &copy;{(new Date().getFullYear())} FrenchBench
      </li>
      <li className={styles.navigationItem}>
        TODO: Terms of Service
      </li>
      <li className={styles.navigationItem}>
        TODO: Privacy Policy
      </li>
    </ul>
  </div>
)

export default Footer;
