import styles from './Nav.module.scss';

function onClickSignIn(ev) {
  ev.preventDefault();
  //signin();
}

function onClickSignOut(ev) {
  ev.preventDefault();
  //signout();
}

export function Nav(props) {
  //const [session, loading] = useSession();
  let content = null;
  if (false) { // signed in
    content = (
      <>
        <span className={styles.avatar} style={{ backgroundImage: `url(${session.user.image})` }} />
        <span className={styles.signedIn}>Signed in as <strong>{session.user.email}</strong></span>
      </>
    );
  } else { // not signed in
    content = (
      <>
        <span className={styles.notSignedIn}>Not signed in</span>
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
