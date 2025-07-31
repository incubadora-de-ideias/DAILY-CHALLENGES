import { differenceInDays } from 'date-fns'
import { CardTask } from "../components/CardTask";
import { useTasks } from "../hooks/useTasks";
import { useMemo } from "react";

interface filterProps {
    filter: string;
}

export const Filter = (props: filterProps) => {
    const { tasks } = useTasks();

    const doneTasks = useMemo(() => {return tasks.filter((task) => task.done === true )}, [tasks])
    const undoneTasks = useMemo(() => {return tasks.filter((task) => task.done === false )}, [tasks])
    
    const lowPriorityTasks = useMemo(() => {return tasks.filter((task) => task.priority === "low")}, [tasks])
    const mediumPriorityTasks = useMemo(() => {return tasks.filter((task) => task.priority === "medium")}, [tasks])
    const highPriorityTasks = useMemo(() => {return tasks.filter((task) => task.priority === "high")}, [tasks])

    function diasRestantes(dueDate: string): number {
        const today = new Date();
        function parseDataBrasileiraParaISO(dataBR: string): string {
            const [dia, mes, ano] = dataBR.split("/");
            return `${ano}-${mes}-${dia}`;
          }

        if (dueDate.includes("/")) {
            dueDate = parseDataBrasileiraParaISO(dueDate);
        }
    
        return differenceInDays(new Date(dueDate), today);
    }
    
    const overdueTasks = useMemo(() => { return tasks.filter((task) => { return diasRestantes(String(task.dueDate)) < 0 && task.done === false; }); }, [tasks]);
    const todayTasks = useMemo(() => { return tasks.filter((task) => { return diasRestantes(String(task.dueDate)) === 0 && task.done === false; }); }, [tasks]);
    const weekTasks = useMemo(() => { return tasks.filter((task) => { return diasRestantes(String(task.dueDate)) <= 7 && task.done === false && diasRestantes(String(task.dueDate)) > 0; }); }, [tasks]);
    const otherTasks = useMemo(() => { return tasks.filter((task) => { return diasRestantes(String(task.dueDate)) > 7; }); }, [tasks]);

    function exibirListaDeTarefas(title: string, tasks: any[]) {
        if (tasks.length === 0) {
            return null
        } else {
                 return ( <div className="border-b-2 border-gray-600 mb-5">
                             <h1 className="text-2xl font-bold p-4">{title}</h1>
                             <ul className="space-y-3 gap-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                {tasks.map((task) => (
                                    <li key={task.id} className="flex p-3 rounded-lg justify-center">
                                        <CardTask id={task.id} title={task.title} description={task.description || "Sem descrição"} dueDate={new Date(task.dueDate).toLocaleDateString()} done={task.done} priority={task.priority || "low"}></CardTask>
                                    </li>
                                ))}
                             </ul>
                         </div> );
                }}

    if (props.filter === "done") {
        return (
            <div>
                { exibirListaDeTarefas("Não Concluídas", undoneTasks)}

                { exibirListaDeTarefas("Concluídas", doneTasks)}

            </div>
        )
    } else if (props.filter === "priority") {
        return (
            <div>
                { exibirListaDeTarefas("Alta", highPriorityTasks)}

                { exibirListaDeTarefas("Média", mediumPriorityTasks)}

                { exibirListaDeTarefas("Baixa", lowPriorityTasks)}
                
            </div>
        )
    } else if (props.filter == "prazo") {
        return (
            <div>
                {exibirListaDeTarefas("Atrasadas", overdueTasks)}

                {exibirListaDeTarefas("Para Hoje", todayTasks)}

                {exibirListaDeTarefas("Para Esta Semana", weekTasks)}

                {exibirListaDeTarefas("Outras", otherTasks)}

            </div>
        )
    }

}





