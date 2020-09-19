import { Footer, Nav } from '../components';

function Health(props) {
  return (
    <>
      <Nav />
      <main>
        <h1>FrenchBench</h1>
        <p>
          health
        </p>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { newConfig, newPg } = require('../serverLib');
  const start = new Date();
  let status = null;
  const config = newConfig(process.env);
  const db = await newPg(config);
  try {
    status = await db.query('SELECT NOW() AS ts, COUNT(*) AS user_count FROM users');
  } catch (err) {
    status = err.message;
  }
  const finish = new Date();

  return {
    props: { status, start, finish },
  }
}

export default Health;
