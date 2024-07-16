'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (username: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSearch = () => {
    if (username) {
      onSearch(username);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="border p-2 rounded-md"
        placeholder="Buscar usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
