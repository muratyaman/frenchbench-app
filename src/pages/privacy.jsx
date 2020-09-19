import { Footer, Nav, PostSummary } from '../components';
import { content } from '../commonLib';

function Privacy(props) {
  return (
    <>
      <Nav />
      <main>
        <h1>FrenchBench</h1>
        <PostSummary {...content.privacy} />
      </main>
      <Footer />
    </>
  );
}

export default Privacy;
