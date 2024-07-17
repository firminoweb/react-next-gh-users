// src/pages/user.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GitHubUser, GitHubRepo } from '@/types';
import Image from 'next/image';
import NotFound from '@/components/NotFound';

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [notFound, setNotFound] = useState(false);
  const GITHUB_TOKEN = 'TOKEN';

  useEffect(() => {
    if (username) {
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data: GitHubUser) => {
          if ('message' in data) {
            setNotFound(true);
            setUserData(null);
          } else {
            setNotFound(false);
            setUserData(data);
          }
        })
        .catch((error) => {
          setNotFound(true);
          setUserData(null);
        });

      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data: GitHubRepo[]) => {
          if (Array.isArray(data)) {
            setRepos(data);
          } else {
            setRepos([]);
          }
        })
        .catch((error) => {
          setRepos([]);
        });
    }
  }, [username]);

  if (notFound) {
    return <NotFound username={username as string} />;
  }

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
