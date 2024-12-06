# React + Next.js | gh-users

Este é um projeto React + Next.js que permite procurar usuários do GitHub e marcar repositórios como favoritos. Ele utiliza **React**, **TypeScript**, **Next,js**, **TailwindCSS** e várias outras ferramentas modernas para desenvolvimento e testes como o **Husky** e o **Commitizen**.

## Funcionalidades
- Buscar usuários do GitHub pelo nome ou nome de usuário
- Exibir repositórios de um usuário específico
- Marcar e desmarcar repositórios como favoritos
- Persistência de favoritos utilizando localStorage
- Interface estilizada com TailwindCSS
- Testes unitários abrangentes com Jest e Testing Library

## Instalação

### 1. Clone o repositório:

```
git clone https://github.com/firminoweb/react-next-gh-users.git
cd react-next-gh-users
```

### 2. Instale as dependências:

- Usando npm: `npm install`
- Usando yarn: `yarn install`

## Configuração do Token do GitHub

Para acessar a API do GitHub, você precisa configurar um token de acesso. Altere o arquivo `configs/index.ts` e adicione o token da seguinte forma:

```
  // Está assim por padrão para rodar em PROD
  export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  // E para rodar localhost insira o token manualmente
  export const GITHUB_TOKEN = 'ghp_6luxB........3rjdV0';
```

## Execução

Para iniciar o projeto, você pode usar os seguintes comandos:

### Ambiente de desenvolvimento:

- Usando NPM: `npm run dev`
- Usando Yarn: `yarn dev`

### Construir o projeto para produção:

- Usando NPM: `npm run build`
- Usando Yarn: `yarn build`

### Iniciar o serviço em produção:

- Usando NPM: `npm start`
- Usando Yarn: `yarn start`

## Testes Unitários

O projeto utiliza Jest para testes unitários. Você pode rodar os testes com cobertura de código utilizando os seguintes comandos:

- Usando NPM: `npm test`
- Usando Yarn: `yarn test`

## Outros Scripts Úteis

### Linting

- Usando NPM: `npm run lint`
- Usando Yarn: `yarn lint`

### Formatação de código:

- Usando NPM: `npm run format`
- Usando Yarn: `yarn format`

### Preparar husky para commits:

- Usando NPM: `npm run prepare`
- Usando Yarn: `yarn prepare`

