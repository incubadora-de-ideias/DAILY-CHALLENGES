import { useMemo, useState } from "react";
import Init from "../components/init";
import { useTasks } from "../hooks/useTasks";
import { CardTask } from "../components/CardTask";
import { differenceInDays } from "date-fns";

import { MdDeleteSweep } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export const Atrasadas = () => {
    const { tasks } = useTasks();
    const { removeTask } = useTasks();

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
    
    const atrasadas = useMemo(() => { return tasks.filter((task) => { return diasRestantes(String(task.dueDate)) < 0 && !task.done; }); }, [tasks]);
    const [showconfirm, setShowConfirm] = useState(false);
    
    if (atrasadas.length === 0) {
        return (
            <Init>
                <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                    <svg width="180" height="180" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6 opacity-60" >
                    
                        <path d="M192 192h640v640H192z"fill="#2D2D2D" stroke="#666" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />

                        <path d="M300 420h424M300 520h260" stroke="#999" strokeWidth="32" strokeLinecap="round" />

                        <circle cx="512" cy="512" r="460" stroke="#444" strokeWidth="28" />
                    </svg>

                    <h2 className="text-2xl font-bold mb-2">Tudo limpo por aqui!</h2>
                    <p className="text-gray-400 max-w-md"> Você não tem nenhuma tarefa atrasada!! Conclue sempre elas e deixa o local aqui limpinho!! </p>                
                </div>
            </Init>
        );
    } else {
        return (
            <Init>
                <div className="mb-5">
                    <h1 className="border-b-3 border-blue-600 text-2xl font-bold p-4">Todas as Tarefas Atrasadas</h1>
                    <ul className="space-y-3 gap-5 gap-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {atrasadas.map((task) => (
                        <li key={task.id} className="flex p-3 rounded-lg justify-center">
                            <CardTask id={task.id} title={task.title} description={task.description || "Sem descrição"} dueDate={new Date(task.dueDate).toLocaleDateString()} done={task.done} priority={task.priority || "low"}></CardTask>
                        </li>
                    ))}
                    </ul>
                </div>
    
                {atrasadas.length > 0 && (<div className="relative">
                    <button title="Deletar Todas!" className="fixed right-10 bottom-10 flex items-center bg-blue-800 rounded-full shadow-lg shadow-gray-700 hover:bg-blue-500 cursor-pointer transition-transform duration-200 hover:scale-110 outline-none"
                    onClick={() => setShowConfirm(true)}>
                        <MdDeleteSweep className="text-6xl p-2.5" />
                    </button>
                </div>)}
    
                {showconfirm && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="flex flex-col p-10 bg-gray-700 rounded-xl gap-13 shadow-lg shadow-gray-600">
                            <div className="relative">
                                <IoClose className="absolute p-1 text-3xl left-72 rounded-full bottom-12 hover:bg-gray-800 cursor-pointer" onClick={() => setShowConfirm(false)} />
                                <h1 className="text-lg font-semibold mb-4">Apagar todas as tarefas Atrasadas?</h1>
                            </div>
                            <div className="flex justify-around">
                                <button className="py-2 px-10 bg-blue-600 rounded-xl hover:bg-blue-800 cursor-pointer" onClick={() => setShowConfirm(false)}>Não</button>
                                <button className="py-2 px-10 bg-blue-600 rounded-xl hover:bg-blue-800 cursor-pointer"
                                onClick={() => {atrasadas.map((task) => removeTask(task.id)); setShowConfirm(false)}}>Sim</button>
                            </div>
                        </div>
                    </div>)}
            </Init>
        );
    }
    
} 