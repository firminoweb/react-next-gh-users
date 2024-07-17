import React from 'react';
import Image from 'next/image';

const NotFound = ({ username }: { username: string }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full text-center">
        <h1 className="text-2xl font-semibold text-[#32C0C6]">
          &quot;{username}&quot;
        </h1>

        <h2 className="d-block font-bold text-2xl text-gray-500 mb-1">
          Nenhum usuário encontrado
        </h2>
        <h3 className="d-block text-base text-gray-500">
          Verifique se a escrita está correta ou tente novamente
        </h3>

        <Image
          className="mx-auto mt-10"
          src="/not_found.png"
          alt="People Search"
          width={399}
          height={438}
          priority
        />
      </div>
    </main>
  );
};

export default NotFound;
