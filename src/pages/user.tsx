import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GitHubUser, GitHubRepo } from '@/types';
import Image from 'next/image';
import NotFound from '@/components/NotFound';
import RepositoryList from '@/components/RepositoryList';

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [favorites, setFavorites] = useState<GitHubRepo[]>([]);
  const GITHUB_TOKEN = 'TOKEN';

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

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

  const toggleFavorite = (repo: GitHubRepo) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === repo.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== repo.id);
    } else {
      updatedFavorites = [...favorites, repo];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (repo: GitHubRepo) => {
    return favorites.some((fav) => fav.id === repo.id);
  };

  if (notFound) {
    return <NotFound username={username as string} />;
  }

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto mt-8 flex">
      <div className="w-2/6 p-4">
        <div className="border rounded-lg p-8 text-center">
          <Image
            className="rounded-full mx-auto"
            src={userData.avatar_url}
            alt={userData.name}
            width={200}
            height={200}
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-600">
            {userData.name}
          </h2>
          <a
            href={`https://github.com/${userData.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 text-sm text-gray-600"
          >
            @{userData.login}
          </a>
          <p className="text-sm text-gray-600">{userData.bio}</p>
        </div>
      </div>
      <div className="w-4/6 p-4 pb-12">
        <h2 className="text-2xl font-bold text-[#32C0C6]">Repositórios</h2>
        <RepositoryList
          repos={repos}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      </div>
    </div>
  );
};

export default UserPage;
