import { render, screen } from '@testing-library/react';
import FavoritesPage from '../favorites';

describe('FavoritesPage', () => {
  it('renders the Favorites page', () => {
    render(<FavoritesPage />);
    const heading = screen.getByText(/Favoritos/i);
    expect(heading).toBeInTheDocument();
  });
});
