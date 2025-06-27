# 📖 Projeto Final de Programação Web Fullstack.

> Aplicação web full-stack desenvolvida como projeto final da disciplina de **Programação Web Fullstack**. O sistema implementa uma arquitetura de 3 camadas (Front-end, Back-end, Banco de Dados) e permite que usuários autenticados pesquisem, salvem e gerenciem uma coleção pessoal de livros.

## 🚀 Funcionalidades

  - **Autenticação de Usuários**: Sistema de Login seguro com tokens `JWT`.
  - **Busca de Livros**: Pesquisa de livros por título ou autor, consumindo a API da Open Library através de um proxy no back-end.
  - **Coleção Pessoal**: Funcionalidade para Salvar e Deletar livros, com persistência de dados em um banco NoSQL.
  - **Rotas Protegidas**: Acesso às funcionalidades principais apenas para usuários logados.
  - **Interface Reativa**: Experiência de Single-Page Application (SPA) construída com `React` e `Material-UI`.

## 📂 Estrutura

O projeto é organizado em um monorepositório com duas pastas principais: `frontend` e `backend`.

**Front-end (`frontend/`)**

```bash
src/
├── components/       # Componentes reutilizáveis (LoginForm, ProtectedRoute)
├── contexts/         # Contexto de Autenticação (AuthContext)
└── pages/            # Componentes de página (LoginPage, SearchPage, SavedBooksPage)
```

**Back-end (`backend/`)**

```bash
src/
├── config/           # Configuração da conexão com o banco de dados
├── models/           # Modelos de dados do Mongoose (User, Book)
└── routes/           # Arquivos de rotas da aplicação (authRoutes, bookRoutes)
```

## 🔧 Instruções de Uso

> Para executar o projeto localmente, siga estas etapas:

1.  **Pré-requisitos:**

      - É necessário ter o `Node.js` (versão 16 ou superior) instalado.
      - É necessário ter uma instância do `MongoDB` rodando localmente ou um URI de conexão.

2.  **Clone o repositório:**

      - `git clone https://github.com/Ingrydd/ProjetoFullstack.git`
      - `cd ProjetoFinalFullstack`

3.  **Configure e rode o Back-end** (em um terminal):

      - `cd backend`
      - `npm install`
      - Crie um arquivo chamado `.env` na raiz da pasta `backend` e preencha com suas variáveis:
        ```
        PORT=3000
        MONGO_URI=mongodb://localhost:27017/nome-bd
        ```
      - `npm run dev`

4.  **Configure e rode o Front-end** (em **outro** terminal):

      - `cd frontend`
      - `npm install`
      - `npm run dev`

5.  **Acesse a aplicação:**

      - O front-end estará disponível em: `http://localhost:5173`
      - A API do back-end estará disponível em: `http://localhost:3000`

## 🛠️ Tecnologias Utilizadas

### **Front-end**

  - [React](https://react.dev/)
  - [Vite](https://vitejs.dev/)
  - [Material-UI](https://mui.com/)
  - [React Router](https://reactrouter.com/)
  - [Axios](https://axios-http.com/)

### **Back-end**

  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/pt-br/)
  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [JSON Web Token](https://jwt.io/)
  - [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)

## 👨‍💻 Autora

  - Ingryd Belazzi Alves