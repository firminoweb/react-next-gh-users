import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renderiza o componente', () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Buscar usuário');
    expect(inputElement).toBeInTheDocument();
  });

  it('chama onSearch quando o botão de busca é clicado', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Buscar usuário');
    fireEvent.change(inputElement, { target: { value: 'testuser' } });

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('chama onSearch quando a tecla Enter é pressionada', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Buscar usuário');
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('não chama onSearch se o campo de entrada estiver vazio', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
