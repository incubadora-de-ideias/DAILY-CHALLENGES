import { useTasks } from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";
import { Status, StatusOfPriority } from "./taskStatus";

interface CardTaskProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  done: boolean;
  priority: string;
}

interface Complete_uncompleteProps {
  done: boolean;
  id: number;
}

const Complete_uncomplete = (props: Complete_uncompleteProps) => {
    const { toggleTask } = useTasks();
    const navigate = useNavigate();

    if (props.done === true) {
      return (
        <button  title="Tarefa Completada. 
Clique para marcar como incompleta." 
            className="hover:bg-blue-500 cursor-pointer rounded-xl p-0.5"
            onClick={() => {toggleTask(props.id); navigate("/listatarefas")} }>✅</button>
      )
    }else {
      return (
        <button title="Tarefa Incompleta. 
Clique para marcar como completada." 
            className="hover:bg-blue-500 cursor-pointer rounded-xl p-0.5"
            onClick={() => {toggleTask(props.id); navigate("/listatarefas")} }>⚠️</button>
      )
    }
}

export const CardTask = (props: CardTaskProps) => {
  const { removeTask } = useTasks();
  const navigate = useNavigate();

  return (
    <div className="hover:bg-blue-50 flex flex-col rounded-xl bg-amber-50 text-black w-74 h-62 justify-between">
        <div className=" flex justify-between p-2.5 bg-blue-400 rounded-t-xl" >
            <h3 title={props.title} className="line-clamp-1">{props.title}</h3>
            <div className="flex gap-1 items-center">
              <StatusOfPriority dueDate={props.dueDate} priority={props.priority}></StatusOfPriority>
              <Status dueDate={props.dueDate} done={props.done}></Status>
              <Complete_uncomplete done={props.done} id={props.id}></Complete_uncomplete>
            </div>
        </div>

        <div className="h-full p-1 hover:cursor-pointer" title="Editar esta tarefa" onClick={() => navigate(`/editar/${props.id}`)} >
            <p className="p-2.5 break-words whitespace-normal line-clamp-5">{props.description}</p>
        </div>
        
        <div className=" flex justify-between p-2.5 bg-blue-300 rounded-b-xl">
            <p >Vence em {props.dueDate} </p>
            <button onClick={() => {
              if (window.confirm(`Você tem certeza que deseja remover a tarefa «${props.title}»?`)) { 
                  alert('Tarefa removida com sucesso!');
                  removeTask(props.id); navigate("/listatarefas")}} } title="Deletar esta tarefa" className="hover:bg-blue-700 cursor-pointer rounded-xl p-0.5">🗑</button>
        </div>
    </div>
  );
}