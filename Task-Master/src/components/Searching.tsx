import { useTasks } from "../hooks/useTasks";
import { FaSearch } from "react-icons/fa";
import { CardTask } from "./CardTask";
import { useMemo } from "react";

interface SearchProps {
    search: string;
}

export default function SearchingResults(props: SearchProps) {
    const searchWord = props.search.toLowerCase().trim();
    const { tasks } = useTasks();

    const searchingResults = useMemo(() => {return tasks.filter((task) => task.title.toLowerCase().trim().includes(searchWord))}, [tasks, searchWord])

    if (searchingResults.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                <FaSearch className="text-5xl text-gray-500 mb-4 animate-pulse" />
                <h1 className="text-2xl font-semibold text-gray-400">
                Nenhuma tarefa encontrada para a busca: "{props.search}"
                </h1>
            </div>
        );
    }else {
        return (
                <div className="mb-5">
                    <h1 className="border-b-3 border-blue-600 text-2xl font-bold p-4">Resultados para a busca: "{props.search}"</h1>
                    <ul className="space-y-3 gap-5 gap-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {searchingResults.map((task) => (
                        <li key={task.id} className="flex p-3 rounded-lg justify-center">
                            <CardTask id={task.id} title={task.title} description={task.description || "Sem descrição"} dueDate={new Date(task.dueDate).toLocaleDateString()} done={task.done} priority={task.priority || "low"}></CardTask>
                        </li>
                    ))}
                    </ul>
                </div> 
        )
    }
}