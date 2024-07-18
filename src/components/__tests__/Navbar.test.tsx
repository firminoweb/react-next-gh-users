import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Navbar', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  it('renderiza a barra de busca e o link de favoritos', () => {
    render(<Navbar />);

    expect(screen.getByPlaceholderText('Buscar usuário')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
  });

  it('navega para a página do usuário com o nome de usuário correto quando uma busca é realizada', () => {
    render(<Navbar />);

    const searchBar = screen.getByPlaceholderText('Buscar usuário');
    fireEvent.change(searchBar, { target: { value: 'testuser' } });

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    expect(pushMock).toHaveBeenCalledWith('/user?username=testuser');
  });
});
