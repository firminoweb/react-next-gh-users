import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders correctly', () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Buscar usuário');
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onSearch when the search button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Buscar usuário');
    fireEvent.change(inputElement, { target: { value: 'testuser' } });

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('calls onSearch when Enter key is pressed', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Buscar usuário');
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('does not call onSearch if input is empty', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
