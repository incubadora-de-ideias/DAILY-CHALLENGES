import { useTasks } from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";

interface CardTaskProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

export const CardTask = (props: CardTaskProps) => {
  const { removeTask } = useTasks();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col rounded-xl bg-amber-50 text-black w-74 h-62 justify-between">
      <h3 className="p-2.5 bg-blue-400 rounded-t-xl" >{props.title}</h3>
      <p className="p-2.5 break-words whitespace-normal">{props.description}</p>
      <div className=" flex justify-between p-2.5 bg-blue-300 rounded-b-xl">
        <p >Vence em {props.dueDate} </p>
        <button onClick={() => {
          if (window.confirm(`Você tem certeza que deseja remover a tarefa «${props.title}»?`)) { 
              alert('Tarefa removida com sucesso!');
              removeTask(props.id); navigate("/listatarefas")}} } className="hover:bg-blue-700 rounded-xl p-0.5">🗑</button>
      </div>
    </div>
  );
}