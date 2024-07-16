'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

const Navbar = () => {
  const router = useRouter();

  const handleSearch = (username: string) => {
    if (username) {
      router.push(`/user?username=${username}`);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl">
          GitHub Repo Finder
        </Link>
        <SearchBar onSearch={handleSearch} />
        <Link href="/favorites" className="text-white">
          Favoritos
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
