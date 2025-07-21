import Sidebar from "../components/sidebar";

interface InitProps {
    children?: React.ReactNode;
}

export default function Home(props: InitProps) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <header className="bg-stone-950 flex justify-between p-6 items-center border-b border-l border-gray-400 rounded-xl">
        <h1 className="text-4xl font-bold">🧠 TaskMaster</h1>
        <h2 className="text-cyan-100 text-lg">Bem vindo ao seu app To-do!</h2>
      </header>

      <div className="flex">
        <Sidebar />

        <div className="flex-1">

        <div className="min-h-[550px] max-h-[calc(100vh-96px)] overflow-y-auto bg-stone-800 rounded-xl shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9">
                {props.children}
            </div>

        </div>

      </div>
    </div>
  );
}
