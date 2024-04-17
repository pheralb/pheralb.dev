import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

interface iGithubResultAPI {
  name: string;
  description: string;
  topics: string[];
  html_url: string;
  stargazers_count: number;
  language: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
  const githubUrl = 'https://api.github.com/users/pheralb/repos?type=owner&sort=updated&per_page=15';

  const res = await fetch(githubUrl);
  const data = await res.json();

  if (!res.ok) {
    throw error(res.status, '🚧 Could not fetch GitHub repos.');
  }

  const projects: iGithubResultAPI[] = data.map((repo: iGithubResultAPI) => ({
    name: repo.name,
    description: repo.description,
    topics: repo.topics.slice(0, 5),
    url: repo.html_url,
    githubUrl: repo.html_url,
    icon: repo.language,
    stargazers_count: repo.stargazers_count
  }));

  return {
    repos: projects,
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=120'
    }
  };
};
