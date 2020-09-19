import { Footer, Nav, PostSummary } from '../components';
import { content } from '../commonLib';

function Terms(props) {
  return (
    <>
      <Nav />
      <main>
        <h1>FrenchBench</h1>
        <PostSummary {...content.terms} />
      </main>
      <Footer />
    </>
  );
}

export default Terms;
