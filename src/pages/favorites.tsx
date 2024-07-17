import { useEffect, useState } from 'react';
import { GitHubRepo } from '@/types';
import RepositoryList from '@/components/RepositoryList';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

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

  if (favorites.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full text-center">
          <h2 className="d-block font-bold text-2xl text-gray-500 mb-1">
            Você não tem nenhum repositório favorito.
          </h2>
          <h3 className="d-block text-base text-gray-500">
            Encontre os repositórios de algum usuário digitando na busca acima
          </h3>
        </div>
      </main>
    );
  }

  return (
    <div className="container w-8/12 mx-auto mt-8 p-4">
      <h2 className="text-2xl mb-5 text-center font-bold text-[#32C0C6]">
        Meus favoritos
      </h2>
      <RepositoryList
        repos={favorites}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
    </div>
  );
};

export default FavoritesPage;
