import { useNavigate } from "react-router-dom";

export const OutOfTask = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center text-white">
            <svg width="180" height="180" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6 opacity-60" >
                
                <path d="M192 192h640v640H192z"fill="#2D2D2D" stroke="#666" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M300 420h424M300 520h260" stroke="#999" strokeWidth="32" strokeLinecap="round" />

                <circle cx="512" cy="512" r="460" stroke="#444" strokeWidth="28" />
            </svg>

            <h2 className="text-2xl font-bold mb-2">Tudo limpo por aqui!</h2>
            <p className="text-gray-400 max-w-md"> Nenhuma tarefa cadastrada ainda. Que tal criar a sua primeira missão e começar com foco total? </p>

            <button
                onClick={() => navigate('/novatarefa')}
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-800 hover:cursor-pointer text-white rounded-full transition"> Criar Tarefa
            </button>
        </div>
    )
}