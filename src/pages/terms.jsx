import Nav from '../components/nav';
import Footer from '../components/footer';
import { content } from '../content';
import PostSummary from '../components/PostSummary';

const Terms = () => (
  <>
    <Nav />
    <main>
      <h1>FrenchBench</h1>
      <PostSummary {...content.terms} />
    </main>
    <Footer />
  </>
);

export default Terms;
