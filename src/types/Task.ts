export type Prioridade ='Baixa' | 'Média' | 'Alta';

export interface Task {
    id: string;
    descricao: string;
    prazo: string;
    prioridade: Prioridade;
    notas?: string;
    tags: string [];
    criadoEm: string;
    completa: boolean;
}