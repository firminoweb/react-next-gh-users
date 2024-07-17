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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="m-5 flex items-center h-10 rounded-lg border border-gray-200 focus-within:shadow-lg bg-white overflow-hidden w-[668px]">
      <input
        className="peer h-full w-full outline-none text-sm text-gray-700 px-2"
        type="text"
        id="search"
        placeholder="Buscar usuário"
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div
        className="grid place-items-center h-full w-12 text-gray-300 cursor-pointer"
        onClick={handleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
