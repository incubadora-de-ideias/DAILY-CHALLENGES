# TaskMaster

**TaskMaster** é um sistema de gerenciamento de tarefas construído com:

- React + TypeScript
- TailwindCSS para estilização
- Context API para gerenciamento de estado global
- React Router DOM para navegação entre páginas
- Persistência de dados com `localStorage`

## 🔧 Funcionalidades implementadas

- 📋 Adicionar tarefas com:
  - Descrição
  - Prazo
  - Prioridade (Alta, Média, Baixa)
  - Notas e Tags (opcionais)
- ✅ Marcar tarefas como completas/incompletas
- 🗑️ Remover tarefas
- 📝 Editar tarefas existentes
- 🔍 Filtrar tarefas por status (pendente, concluída) e prioridade
- 📊 Dashboard com estatísticas de tarefas
- 💾 Persistência automática no navegador (localStorage)
- 🎨 Interface moderna com fundo fumado (cinza escuro)

## 📁 Estrutura do Projeto

src/
├── components/ # Componentes reutilizáveis (ex: TaskCard)
├── context/ # TaskContext para estado global
├── hooks/ # Hooks personalizados (ex: useTasks)
├── pages/ # Páginas principais (Dashboard, TaskList, TaskForm)
├── types/ # Tipagem TypeScript
├── App.tsx # Configuração de rotas


## 🚀 Como iniciar

```bash
//instalar as dependencias
npm install

//Executar
npm run dev

📌 #Futuras_melhorias_planejadas

Filtro por data e tags
Ordenação por prioridade ou prazo
Responsividade avançada
Autenticação de usuários

🧑‍💻 # Autor
Feito por Luís Baptista Fidel