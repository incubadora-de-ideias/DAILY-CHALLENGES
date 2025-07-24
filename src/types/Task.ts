//Tarefas que serão armazenadas
export interface Task {
  id: number;
  nome: string;
  descricao: string;
  prazo: string;
  prioridade: string;
  notas: string;
  tags: string; //Ira armazenar palavras chave, como: trabalho, escola
  criado: string;
  completo: boolean;
}
