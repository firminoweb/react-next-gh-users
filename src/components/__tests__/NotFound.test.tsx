// src/components/__tests__/NotFound.test.tsx
import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';

describe('NotFound', () => {
  it('renders the NotFound component with the correct username', () => {
    const username = 'nonexistentuser';
    render(<NotFound username={username} />);

    const usernameElement = screen.getByText(`"${username}"`);
    const noUserFoundElement = screen.getByText('Nenhum usuário encontrado');
    const suggestionElement = screen.getByText(
      'Verifique se a escrita está correta ou tente novamente',
    );
    const imageElement = screen.getByAltText('People Search');

    expect(usernameElement).toBeInTheDocument();
    expect(noUserFoundElement).toBeInTheDocument();
    expect(suggestionElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });
});
