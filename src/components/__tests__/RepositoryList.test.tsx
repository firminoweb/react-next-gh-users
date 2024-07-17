import { render, screen, fireEvent } from '@testing-library/react';
import RepositoryList from '../RepositoryList';
import { GitHubRepo } from '@/types';
import { format } from 'date-fns';

const mockRepos: GitHubRepo[] = [
  {
    id: 1,
    name: 'Repo 1',
    full_name: 'user/repo1',
    html_url: 'https://github.com/user/repo1',
    description: 'This is a test repo 1',
    fork: false,
    created_at: '2023-01-01T12:00:00Z',
    updated_at: '2023-07-10T12:34:56Z',
    pushed_at: '2023-07-10T12:34:56Z',
    homepage: '',
    size: 100,
    stargazers_count: 50,
    watchers_count: 50,
    language: 'JavaScript',
    forks_count: 5,
    open_issues_count: 2,
    license: {
      key: 'mit',
      name: 'MIT License',
      spdx_id: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
      node_id: 'MDc6TGljZW5zZTEz',
    },
    default_branch: 'main',
  },
  {
    id: 2,
    name: 'Repo 2',
    full_name: 'user/repo2',
    html_url: 'https://github.com/user/repo2',
    description: 'This is a test repo 2',
    fork: false,
    created_at: '2023-01-01T12:00:00Z',
    updated_at: '2023-07-11T12:34:56Z',
    pushed_at: '2023-07-11T12:34:56Z',
    homepage: '',
    size: 200,
    stargazers_count: 100,
    watchers_count: 100,
    language: 'TypeScript',
    forks_count: 10,
    open_issues_count: 4,
    license: {
      key: 'mit',
      name: 'MIT License',
      spdx_id: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
      node_id: 'MDc6TGljZW5zZTEz',
    },
    default_branch: 'main',
  },
];

const mockToggleFavorite = jest.fn();
const mockIsFavorite = jest.fn();

describe('RepositoryList', () => {
  it('renders the list of repositories correctly', () => {
    render(
      <RepositoryList
        repos={mockRepos}
        favorites={[]}
        toggleFavorite={mockToggleFavorite}
        isFavorite={mockIsFavorite}
      />,
    );

    mockRepos.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument();
      if (repo.description) {
        expect(screen.getByText(repo.description)).toBeInTheDocument();
      }
      if (repo.language) {
        expect(screen.getByText(repo.language)).toBeInTheDocument();
      }
      expect(
        screen.getByText((content, element) => {
          const normalizedText = content.replace(/\s+/g, ' ').trim();
          const expectedText = `Updated on ${format(new Date(repo.updated_at), 'dd MMM yyyy')}`;
          return normalizedText.includes(expectedText);
        }),
      ).toBeInTheDocument();
    });
  });

  it('calls toggleFavorite when the favorite button is clicked', () => {
    render(
      <RepositoryList
        repos={mockRepos}
        favorites={[]}
        toggleFavorite={mockToggleFavorite}
        isFavorite={mockIsFavorite}
      />,
    );

    const favoriteButtons = screen.getAllByRole('button');

    fireEvent.click(favoriteButtons[0]);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockRepos[0]);

    fireEvent.click(favoriteButtons[1]);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockRepos[1]);
  });

  it('displays the correct favorite icon based on isFavorite', () => {
    mockIsFavorite.mockImplementation((repo) => repo.id === 1);

    render(
      <RepositoryList
        repos={mockRepos}
        favorites={[]}
        toggleFavorite={mockToggleFavorite}
        isFavorite={mockIsFavorite}
      />,
    );

    const favoriteIcons = screen.getAllByRole('img');

    expect(favoriteIcons[0]).toHaveAttribute('alt', 'Favorito');
    expect(favoriteIcons[1]).toHaveAttribute('alt', 'Favoritar');
  });
});
