import Head from 'next/head';
import Link from 'next/link';
import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import {
  StarIcon,
  WatchIcon,
  BugIcon,
  GithubIcon,
  projectIcons
} from '../../components/Icons';

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      githubData: {},
      githubDataReady: false,
    };
  }

  async componentDidMount() {
    const { project } = this.props;

    const res = await fetch(`https://api.github.com/repos/${project.path}`);
    const githubResponse = await res.json();
  
    this.setState({
      githubData: githubResponse,
      githubDataReady: Object.keys(githubResponse).length > 0,
    });
  }
  
  render() {
    const {
      project,
      projects,
    } = this.props;
    const {
      githubData,
      githubDataReady,
    } = this.state;
    
    const Icon = projectIcons[project.id];
    const NextIcon = projectIcons['next'];
    
    return (
      <div
        className="project" >
        <Head>
          <title>{project.name} | Next.js Starter Static Apps</title>
        </Head>
        <aside>
          <h3>
            <Link
              href={`/`} >
              <a
                className="masthead" >
                <div
                  className="masthead-logo" >
                  <NextIcon />
                </div>
                <div>
                  Next.js Static App Demo
                </div>
              </a>
            </Link>
          </h3>
          <ul>
            {projects.map((project) => {
              return (
                <li
                  key={project.id} >
                  <Link
                    href={`/project/${project.slug}`} >
                    <a>{project.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
        <main>
          {githubDataReady && (
            <div
              className="card-big">
              <Icon w={249} h={278} />
              <div
                className="stats" >
                <div
                  className="stats-details" >
                  <div>
                    <StarIcon w={18} h={18} />
                    <p>{githubData.stargazers_count}</p>
                  </div>
                  <p>stars</p>
                </div>
                <div
                  className="stats-details" >
                  <div>
                    <WatchIcon w={18} h={18} />
                    <p>{githubData.watchers_count}</p>
                  </div>
                  <p>watchers</p>
                </div>
                <div
                  className="stats-details" >
                  <div>
                    <BugIcon w={18} h={18} />
                    <p>{githubData.open_issues}</p>
                  </div>
                  <p>issues</p>
                </div>
              </div>
              <p
                className="description">
                {githubData.description}
              </p>
              <div
                className="cta" >
                <a
                  className="button-github"
                  href={githubData.html_url}
                  target="_blank" >
                  <GithubIcon w={24} h={24} />
                  Learn more...
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}
// At build time, determine all possible dynamic paths
export async function getStaticPaths() {
  const projectsData = require('../../utils/projectsData.js');

  const paths = projectsData.projects.map((project) => {

    // Return the value expected in the dynamic path
    // [slug].js
    return {
      params: {
        slug: project.slug
      },
    };
  });

  // Pre-rendered paths
  // Any undefined path will return a 404: { fallback: false }
  return {
    paths,
    fallback: false
  };
}

// At build time, prepopulate all props for each page
export async function getStaticProps(context) {
  // Next.js provides context for statically generated applications at build time
  const { slug } = context.params;

  const { projects } = require('../../utils/projectsData.js');
  const project = projects.find(project => project.slug === slug);

  return {
    props: {
      slug,
      project,
      projects,
    },
  };
};

export default Project;
