import { GitHubRepo } from '@/types';
import { format } from 'date-fns';
import Image from 'next/image';

interface RepositoryListProps {
  repos: GitHubRepo[];
  favorites: GitHubRepo[];
  toggleFavorite: (repo: GitHubRepo) => void;
  isFavorite: (repo: GitHubRepo) => boolean;
}

const RepositoryList: React.FC<RepositoryListProps> = ({
  repos,
  favorites,
  toggleFavorite,
  isFavorite,
}) => {
  const languageColors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
  };

  return (
    <div className="mt-4 space-y-4">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="relative border rounded-lg p-4 flex justify-between items-center"
        >
          <div className="w-10/12">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-gray-600 block mb-2"
            >
              {repo.name}
            </a>
            <p className="text-sm text-gray-400 mb-4">{repo.description}</p>
            <div className="mt-2 flex items-center space-x-4">
              <div className="flex items-center">
                <span
                  className="inline-block w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor: repo.language
                      ? languageColors[repo.language] || '#ccc'
                      : '#ccc',
                  }}
                ></span>
                <span className="inline-block text-sm text-gray-600">
                  {repo.language || 'N/A'}
                </span>
              </div>
              <div className="flex text-sm text-gray-500">
                Updated on {format(new Date(repo.updated_at), 'dd MMM yyyy')}
              </div>
            </div>
          </div>
          <button
            onClick={() => toggleFavorite(repo)}
            className="absolute top-4 right-4"
          >
            <Image
              src={isFavorite(repo) ? '/favorito.png' : '/favoritar.png'}
              alt={isFavorite(repo) ? 'Favorito' : 'Favoritar'}
              width={40}
              height={40}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
