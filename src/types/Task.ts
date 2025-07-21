
export type priority = 'baixa' | 'média' | 'alta'

export interface Task {

    id:string,
    descricao:string,
    prazo:string,
    Prioridade:priority,
    notas?:string,
    tags:string[],
    datacriacao:string,
    completa:boolean,
}