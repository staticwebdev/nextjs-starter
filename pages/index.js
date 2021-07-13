import Head from 'next/head';
import SmallCard from '../components/SmallCard';
import { projectIcons } from '../components/Icons';

const Home = (props) => (
  <div className="home">
    <Head>
      <title>Home | Next.js Starter Static Apps</title>
    </Head>
    <h1>What Can I Deploy to Static Apps?</h1>
    <div className="card-grid">
      {props.projects.map((project) => {
        const Icon = projectIcons[project.id];
        
        return (
          <SmallCard
            key={project.id}
            Icon={Icon}
            title={project.name}
            slug={project.slug} />
        );
      })}
    </div>
  </div>
);

// At build time, generate a static version of the page
export async function getStaticProps(context) {
  const { projects } = require('../utils/projectsData.js');

  return {
    props: {
      projects,
    },
  };
};

export default Home;
