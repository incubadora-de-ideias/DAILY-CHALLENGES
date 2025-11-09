# 📚 Sistema de Gestão de Biblioteca

Sistema completo de gestão de biblioteca desenvolvido em React com Vite, permitindo gerenciar livros, usuários, empréstimos, relatórios e histórico de atividades.

## Como Executar o Sistema

### Pré-requisitos

- **Node.js** (versão 20.19.0 ou superior recomendado)
- **npm** ou **yarn**

### Passos para Execução

1. **Navegue até a pasta do projeto**
   ```bash
   cd gestao/biblioteca
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra o navegador em `http://localhost:5173` 
   - A página de login será exibida automaticamente

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento na porta 5173

# Build para produção
npm run build        # Cria build otimizado de produção

# Preview do build
npm run preview      # Visualiza o build de produção localmente

# Lint (verificação de código)
npm run lint         # Verifica erros e padrões de código
```

## 👤 Usuários de Teste

O sistema vem pré-configurado com os seguintes usuários para testes:

### 🔑 Administrador

- **Nome:** Administrador
- **Email:** `admin@biblioteca.com`
- **Senha:** `admin123`
- **Tipo:** Admin
- **Permissões:**
  - ✅ Acesso total ao sistema
  - ✅ Gerenciar usuários (criar, editar, excluir)
  - ✅ Gerenciar livros (criar, editar, excluir)
  - ✅ Gerenciar empréstimos
  - ✅ Acessar relatórios e estatísticas
  - ✅ Visualizar histórico de atividades
  - ✅ Limpar histórico

### 👥 Usuários Comuns

#### Usuário 1
- **Nome:** Nelson Marques
- **Email:** `nelson@biblioteca.com`
- **Senha:** `nelson123`
- **Tipo:** Comum
- **Permissões:**
  - ✅ Visualizar livros
  - ✅ Cadastrar livros
  - ✅ Editar livros
  - ✅ Visualizar empréstimos
  - ❌ Excluir livros
  - ❌ Gerenciar usuários
  - ❌ Acessar relatórios
  - ❌ Visualizar histórico

#### Usuário 2
- **Nome:** Maria Santos
- **Email:** `maria@biblioteca.com`
- **Senha:** `maria123`
- **Tipo:** Comum
- **Permissões:** (mesmas do usuário comum acima)

### 📝 Criar Novo Usuário

Você também pode criar novos usuários através da página de cadastro (`/register`) ou através da gestão de usuários (apenas administradores).

## 📁 Estrutura Geral do Projeto

```
biblioteca/
│
├── public/                          # Arquivos públicos estáticos
│   └── vite.svg                     # Favicon e assets públicos
│
├── src/
│   ├── assets/                      # Recursos estáticos (imagens, etc.)
│   │   └── salaBiblioteca.png      # Imagem de fundo da biblioteca
│   │
│   ├── components/                  # Componentes React reutilizáveis
│   │   ├── BookForm.jsx            # Formulário de livros (criar/editar)
│   │   ├── BookList.jsx            # Lista de livros (componente auxiliar)
│   │   ├── LoanForm.jsx            # Formulário de empréstimos
│   │   ├── LoginForm.jsx           # Formulário de login
│   │   ├── Navbar.jsx              # Barra de navegação principal
│   │   ├── ProtectedRoute.jsx      # Componente de proteção de rotas
│   │   ├── RegisterForm.jsx       # Formulário de cadastro
│   │   ├── UserForm.jsx           # Formulário de usuários (criar/editar)
│   │   ├── UserMenu.jsx            # Menu do usuário (componente auxiliar)
│   │   ├── View.jsx                # Componente visual para página de registro
│   │   └── ViewLogin.jsx           # Componente visual para página de login
│   │
│   ├── context/                     # Contextos React (estado global)
│   │   └── AuthContext.jsx        # Contexto de autenticação e usuário logado
│   │
│   ├── data/                        # Arquivos JSON com dados iniciais
│   │   ├── emprestimos.json        # Dados iniciais de empréstimos
│   │   ├── livros.json             # Dados iniciais de livros
│   │   └── usuarios.json           # Dados iniciais de usuários
│   │
│   ├── pages/                       # Páginas principais da aplicação
│   │   ├── BooksPage.jsx           # Página de gestão de livros
│   │   ├── Dashboard.jsx           # Dashboard principal com estatísticas
│   │   ├── HistoryPage.jsx          # Página de histórico de atividades
│   │   ├── LoansPage.jsx           # Página de gestão de empréstimos
│   │   ├── LoginPage.jsx           # Página de login
│   │   ├── RegisterPage.jsx        # Página de cadastro
│   │   ├── ReportsPage.jsx         # Página de relatórios e estatísticas
│   │   └── UsersPage.jsx           # Página de gestão de usuários
│   │
│   ├── services/                    # Serviços de lógica de negócio
│   │   ├── authService.js          # Serviço de autenticação (login/logout)
│   │   ├── booksService.js         # Serviço de livros (CRUD completo)
│   │   ├── historyService.js       # Serviço de histórico de atividades
│   │   ├── loansService.js         # Serviço de empréstimos (CRUD completo)
│   │   ├── reportsService.js       # Serviço de relatórios (auxiliar)
│   │   └── usersService.js         # Serviço de usuários (CRUD completo)
│   │
│   ├── styles/                      # Arquivos CSS de estilização
│   │   ├── authForms.css           # Estilos específicos para formulários de login/registro
│   │   ├── forms.css                # Estilos para formulários gerais
│   │   ├── global.css               # Estilos globais da aplicação
│   │   ├── responsive.css           # Estilos responsivos (mobile, tablet, desktop)
│   │   └── tables.css               # Estilos para tabelas
│   │
│   ├── utils/                       # Funções utilitárias auxiliares
│   │   ├── authUtils.js            # Utilitários de autenticação
│   │   ├── dateUtils.js            # Utilitários de formatação de datas
│   │   └── exportUtils.js          # Utilitários de exportação (CSV, JSON, PDF)
│   │
│   ├── App.jsx                      # Componente raiz da aplicação
│   ├── App.css                      # Estilos do componente App
│   ├── main.jsx                     # Ponto de entrada do React
│   ├── index.css                    # Estilos globais base
│   └── routes.jsx                   # Definição de todas as rotas da aplicação
│
├── .gitignore                       # Arquivos ignorados pelo Git
├── eslint.config.js                 # Configuração do ESLint
├── index.html                       # HTML principal da aplicação
├── package.json                     # Dependências e scripts do projeto
├── package-lock.json                # Lock file das dependências
├── README.md                        # Este arquivo
└── vite.config.js                   # Configuração do Vite
```

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces de usuário
- **Vite** - Build tool e servidor de desenvolvimento rápido
- **React Router** - Roteamento e navegação entre páginas
- **React Icons** - Biblioteca de ícones (Font Awesome)
- **LocalStorage** - Armazenamento local de dados no navegador
- **JSON** - Estrutura de dados inicial e persistência

## 📋 Funcionalidades Implementadas

### ✅ Autenticação e Controle de Acesso
- Login e cadastro de usuários
- Controle de permissões (Admin/Comum)
- Proteção de rotas com `ProtectedRoute`
- Persistência de sessão no LocalStorage
- Logout seguro

### ✅ Gestão de Livros (CRUD Completo)
- Cadastrar, listar, editar e excluir livros
- Busca por título ou autor
- Filtro por status (Disponível, Emprestado, Reservado, Manutenção)
- Controle de permissões (apenas Admin pode excluir)
- Validação de dados

### ✅ Gestão de Usuários (CRUD Completo)
- Cadastrar, listar, editar e excluir usuários
- Busca por nome, email ou tipo
- Controle de permissões (apenas Admin)
- Proteção contra auto-exclusão
- Validação de email e senha

### ✅ Controle de Empréstimos
- Registrar novos empréstimos
- Registrar devoluções
- Listar empréstimos ativos e finalizados
- Filtros por status
- Atualização automática do status dos livros
- Destaque para empréstimos atrasados
- Acesso restrito a administradores

### ✅ Relatórios e Estatísticas
- Estatísticas gerais (total de livros, disponíveis, emprestados)
- Quantidade de empréstimos ativos
- Top 5 usuários com mais empréstimos
- Exportação para CSV
- Exportação para PDF
- Acesso restrito a administradores

### ✅ Histórico de Atividades
- Registro automático de todas as ações do sistema
- Filtro por tipo de ação
- Exibição do mais recente ao mais antigo
- Campos: Usuário responsável, Tipo de ação, Data e hora, Detalhes
- Limpeza do histórico (apenas Admin)
- Acesso restrito a administradores

### ✅ Interface e Navegação
- Menu de navegação (Navbar) com acesso a todas as páginas
- Dashboard interativo com estatísticas em tempo real
- Cards de estatísticas clicáveis
- Ações rápidas no Dashboard
- Informações do usuário logado no menu
- Botão de logout
- Destaque visual da página atual
- Design responsivo e moderno

## 📖 Como Usar

### Primeiro Acesso

1. Acesse `http://localhost:5173`
2. Faça login com um dos usuários de teste acima
3. Explore o Dashboard e as funcionalidades disponíveis

### Navegação

Após fazer login, você terá acesso ao menu de navegação no topo da página:

- **Dashboard** - Página inicial com estatísticas e ações rápidas
- **Livros** - Gestão completa de livros (CRUD)
- **Empréstimos** - Gestão de empréstimos (apenas Admin)
- **Usuários** - Gestão de usuários (apenas Admin)
- **Relatórios** - Relatórios e estatísticas (apenas Admin)
- **Histórico** - Histórico de atividades (apenas Admin)

### Autenticação

1. **Login**
   - Acesse a página de login
   - Digite email e senha de um usuário válido
   - Clique em "Entrar"

2. **Cadastro**
   - Clique em "Criar conta" na página de login
   - Preencha os dados (nome, email, senha, confirmar senha)
   - Escolha o tipo de usuário (Comum/Admin)
   - Após cadastro, login automático será realizado

## 🔐 Controle de Permissões

### Usuário Comum
- ✅ Visualizar livros
- ✅ Cadastrar livros
- ✅ Editar livros
- ✅ Visualizar empréstimos
- ❌ Excluir livros
- ❌ Gerenciar usuários
- ❌ Gerenciar empréstimos
- ❌ Acessar relatórios
- ❌ Visualizar histórico

### Administrador
- ✅ Todas as permissões de usuário comum
- ✅ Excluir livros
- ✅ Gerenciar usuários (criar, editar, excluir)
- ✅ Gerenciar empréstimos (criar, devolver, excluir)
- ✅ Acessar relatórios e estatísticas
- ✅ Visualizar e limpar histórico de atividades

## 💾 Armazenamento de Dados

O sistema utiliza uma combinação de:

1. **Arquivos JSON** (`src/data/`)
   - Dados iniciais e padrão
   - Não são modificados pelo sistema
   - Servem como "seed" inicial

2. **LocalStorage** (navegador)
   - Novos registros criados pelo usuário
   - Modificações em registros existentes
   - Dados do usuário logado
   - Chaves utilizadas:
     - `biblioteca_user` - Usuário logado
     - `biblioteca_users` - Usuários cadastrados
     - `biblioteca_livros` - Livros cadastrados
     - `biblioteca_emprestimos` - Empréstimos registrados
     - `biblioteca_historico` - Histórico de atividades

**⚠️ Importante:** Limpar o cache/localStorage do navegador apagará todos os dados salvos localmente.

## 📝 Rotas da Aplicação

- `/` - Redireciona para `/dashboard`
- `/login` - Página de login (pública)
- `/register` - Página de cadastro (pública)
- `/dashboard` - Dashboard principal (protegida)
- `/books` - Gestão de livros (protegida)
- `/users` - Gestão de usuários (protegida, apenas Admin)
- `/loans` - Empréstimos (protegida, apenas Admin)
- `/reports` - Relatórios (protegida, apenas Admin)
- `/history` - Histórico (protegida, apenas Admin)

## 🎨 Status dos Livros

- **Disponível** - Livro disponível para empréstimo
- **Emprestado** - Livro atualmente emprestado
- **Reservado** - Livro reservado por um usuário
- **Manutenção** - Livro em manutenção/reparo


## 👨‍💻 Desenvolvido com

- React 19
- Vite 7
- React Router DOM
- React Icons
- JavaScript ES6+
- CSS3

---

**Versão:** 2.0.0  
**Última atualização:** 2024
