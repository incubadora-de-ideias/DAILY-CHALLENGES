import { useContext } from 'react'
import { TaskContext } from '../context/TaskContext'

export const useTasks = () =>{
const context = useContext( TaskContext )
    // Verifica se o contexto foi inicializado
    if(!context){
        throw new Error("useTask deve ser usado de dentro de um TaskProvider")
    }

    return context
}

