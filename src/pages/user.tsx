import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GitHubUser, GitHubRepo } from '@/types';

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    if (username) {
      fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data: GitHubUser) => setUserData(data));

      fetch(`https://api.github.com/users/${username}/repos`)
        .then((res) => res.json())
        .then((data: GitHubRepo[]) => setRepos(data));
    }
  }, [username]);

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">{userData.name}</h1>
      <p>{userData.bio}</p>
      <h2 className="text-xl font-semibold mt-4">Repositórios</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
