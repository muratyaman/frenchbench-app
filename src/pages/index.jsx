import Nav from '../components/nav';
import Footer from '../components/footer';
import { content } from '../content';
import PostSummary from '../components/PostSummary';

const Home = () => (
  <>
    <Nav />
    <main>
      <h1>FrenchBench</h1>
      <PostSummary {...content.home} />
    </main>
    <Footer />
  </>
);

export default Home;
