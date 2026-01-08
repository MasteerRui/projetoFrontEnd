# Loja Online - Frontend
 
Aplicação web de e-commerce desenvolvida com React, TypeScript e Material-UI, integrada com a FakeStore API.
 
## Índice
 
- [API Escolhida](#api-escolhida)
- [Endpoints Utilizados](#endpoints-utilizados)
- [Instalação](#instalação)
- [Execução](#execução)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
 
## API Escolhida
 
**FakeStore API** - https://fakestoreapi.com
 
API REST gratuita que fornece dados de produtos de uma loja online, incluindo produtos, categorias, utilizadores e autenticação.
 
**Documentação:** https://fakestoreapi.com/docs
 
## Endpoints Utilizados
 
### Produtos
 
- `GET /products` - Listar todos os produtos
  - Parâmetros opcionais: `limit`, `sort` (asc/desc)
- `GET /products/:id` - Obter produto por ID
- `GET /products/categories` - Listar todas as categorias
- `GET /products/category/:category` - Filtrar produtos por categoria
  - Parâmetros opcionais: `limit`, `sort` (asc/desc)
- `POST /products` - Criar novo produto
- `PUT /products/:id` - Atualizar produto completo
- `PATCH /products/:id` - Atualizar produto parcialmente
- `DELETE /products/:id` - Eliminar produto
 
### Autenticação
 
- `POST /auth/login` - Login de utilizador
  - Body: `{ username: string, password: string }`
  - Retorna: `{ token: string }`
 
### Utilizadores
 
- `GET /users/:id` - Obter utilizador por ID (requer autenticação)
 
## Instalação
 
### Pré-requisitos
 
- Node.js (versão 18 ou superior)
- npm ou yarn
 
### Passos
 
1. Clone o repositório:
```bash
git clone https://github.com/MasteerRui/projetoFrontEnd.git
cd projetoFrontEnd
```
 
2. Instale as dependências:
```bash
npm install
```
 
## Execução
 
### Modo de Desenvolvimento
 
```bash
npm run dev
```
 
A aplicação estará disponível em `http://localhost:5173`
 
### Build para Produção
 
```bash
npm run build
```
 
### Preview da Build
 
```bash
npm run preview
```
 
### Linting
 
```bash
npm run lint
```
 
## Funcionalidades Implementadas
 
### Gestão de Produtos
 
- ✅ Listagem de produtos com grid responsivo
- ✅ Visualização de detalhes do produto
- ✅ Filtro por categoria
- ✅ Pesquisa por título e descrição
- ✅ Ordenação por preço (ascendente/descendente)
- ✅ Ordenação por rating (maior/menor avaliação)
- ✅ Exibição de rating e número de avaliações
- ✅ Cards de produtos com hover effects
 
### Carrinho de Compras
 
- ✅ Adicionar produtos ao carrinho
- ✅ Visualizar produtos no carrinho
- ✅ Atualizar quantidade de produtos
- ✅ Remover produtos do carrinho
- ✅ Calcular subtotal e total
- ✅ Persistência no localStorage
- ✅ Badge com contador de itens na navbar
 
### Autenticação
 
- ✅ Sistema de login com FakeStore API
- ✅ Proteção de rotas (Protected Routes)
- ✅ Gestão de token JWT
- ✅ Logout funcional
- ✅ Persistência de sessão no localStorage
- ✅ Redirecionamento automático após login
 
### Painel Administrativo
 
- ✅ Listagem de todos os produtos em tabela
- ✅ Criar novo produto (modal com validação)
- ✅ Editar produto existente
- ✅ Eliminar produto (com confirmação)
- ✅ Preview de imagem em tempo real
- ✅ Validação de formulários
- ✅ Select de categorias da API
- ✅ Acesso protegido (requer autenticação)
 
### Design e UI/UX
 
- ✅ Design minimalista preto e branco (estilo shadcn)
- ✅ Tema customizado Material-UI
- ✅ Layout responsivo (mobile, tablet, desktop)
- ✅ Navegação intuitiva com navbar
- ✅ Feedback visual (loading, erros, sucesso)
- ✅ Animações e transições suaves
- ✅ Cards com hover effects
- ✅ Modal compacto e organizado
 
### Integração com API
 
- ✅ Integração completa com FakeStore API
- ✅ Tratamento de erros
- ✅ Estados de loading
- ✅ Cache de dados no cliente
- ✅ Filtros e ordenação
 
### Internacionalização
 
- ✅ Interface em Português de Portugal
- ✅ Terminologia correta (Cesto, Entrega, Atualizar, etc.)
 
## Tecnologias
 
- **React 19.2.0** - Biblioteca JavaScript para interfaces
- **TypeScript 5.9.3** - Superset JavaScript com tipagem
- **Vite 7.2.4** - Build tool e dev server
- **Material-UI 7.3.7** - Biblioteca de componentes React
- **React Router 7.12.0** - Roteamento para React
- **ESLint** - Linter para JavaScript/TypeScript
 
## Estrutura do Projeto
 
```
frontend/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   │   ├── CartItem.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductList.tsx
│   │   └── ProtectedRoute.tsx
│   ├── hooks/            # Custom hooks
│   │   ├── useAuth.tsx
│   │   ├── useCart.ts
│   │   └── useProducts.ts
│   ├── pages/            # Páginas da aplicação
│   │   ├── Admin.tsx
│   │   ├── Cart.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   └── ProductDetail.tsx
│   ├── services/         # Serviços de API
│   │   └── api.ts
│   ├── types.ts          # Definições de tipos TypeScript
│   ├── theme.ts          # Configuração do tema Material-UI
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Ponto de entrada
├── public/               # Ficheiros estáticos
├── package.json
└── README.md
```
 
## Credenciais de Teste
 
Para aceder ao painel administrativo, utilize as seguintes credenciais:
 
- **Utilizador:** `johnd`
- **Palavra-passe:** `m38rmF$`

