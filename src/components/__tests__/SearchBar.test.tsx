// components/SearchBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/SearchBar';

describe('SearchBar', () => {
  it('should call onSearch with the entered username', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Buscar usuário');
    const button = screen.getByText('Buscar');

    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });
});
