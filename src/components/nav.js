import { signin, signout, useSession } from 'next-auth/client';
import styles from './nav.module.css';

function onClickSignIn(ev) {
  ev.preventDefault();
  signin();
}

function onClickSignOut(ev) {
  ev.preventDefault();
  signout();
}

function Nav(props) {
  const [session, loading] = useSession();
  let content = null;
  if (session) { // signed in
    content = (
      <>
        <span className={styles.avatar} style={{ backgroundImage: `url(${session.user.image})` }} />
        <span className={styles.signedIn}>Signed in as <strong>{session.user.email}</strong></span>
        <a href='/api/auth/signout' onClick={onClickSignOut}>
          <button className={styles.signoutButton} type='button'>Sign out</button>
        </a>
      </>
    );
  } else { // not signed in
    content = (
      <>
        <span className={styles.notSignedIn}>Not signed in</span>
        <a href='/api/auth/signin' onClick={onClickSignIn}>
          <button className={styles.signinButton} type='button'>Sign in</button>
        </a>
      </>
    );
  }

  return (
    <nav>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <p className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}>
        {content}
      </p>
    </nav>
  );
}

export default Nav;
