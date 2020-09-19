import { useEffect, useState } from 'react';
import { Footer, Nav, PostSummary } from '../components';
import { content } from '../commonLib';

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function Home(props) {
  const isMounted = useMounted();
  return (
    <>
      <Nav />
      <main>
        <h1>FrenchBench</h1>

        <section>
          <h1>This section is server-side rendered.</h1>
        </section>

        {isMounted ? (
          <section>
            <h2>
              This section is <em>only</em> client-side rendered.
            </h2>
          </section>
        ) : (
          <span>Loading...</span>
        )}

        <PostSummary {...content.home} />
      </main>
      <Footer />
    </>
  );
}

export default Home;
