import { useState } from "react";
import { Filter  } from "../components/filter";
import Sidebar from "../components/sidebar";

export default function Home() {
  const [filte, setFilter] = useState("done")
  const [search, setSearch] = useState("")

  return (
      <div className="min-h-screen bg-neutral-900 text-white">
        <header className="bg-stone-950 flex justify-between p-6 items-center border-b border-l border-gray-400 rounded-t-xl">
          <h1 className="text-4xl font-bold">🧠 TaskMaster</h1>
          <h2 className="text-cyan-100 text-lg">Bem vindo ao seu app To-do!</h2>
        </header>

        <div className="flex"> 
          <Sidebar /> 
        
          <div className="flex-1">
            <div className="p-5 min-h-[550px] max-h-[calc(100vh-90px)] overflow-y-auto scrollbar scrollbar-thumb-gray-800 scrollbar-hover:scrollbar-thumb-slate-700">
                  <div className="flex items-start w-full justify-between p-3 mb-5">
                      <input type="search" value={search} onChange={(text) => setSearch(text.target.value) } className="p-2 bg-neutral-700 border border-gray-600 rounded-3xl w-90" placeholder="Pesquisar" />

                      <select value={filte} onChange={(text) => setFilter(text.target.value) } id="filter" className="p-2 bg-neutral-700 border border-gray-600 rounded-3xl w-50" >
                        <option value="done">Status</option>
                        <option value="priority">Prioridade</option>
                        <option value="prazo">Prazo</option>
                        <option value="tag">Tag</option>
                      </select>

                  </div>
                  <div>
                      <Filter filter={filte}></Filter>
                  </div>
                  
            </div>
          </div>
        </div>
      </div>
  );
}
