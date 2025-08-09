import { NavLink } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
import SearchingResults from "./Searching";
import { useState } from "react";

import { FiMenu } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { IoAddCircleOutline, IoAlertCircleOutline  } from "react-icons/io5";
import { MdTaskAlt } from "react-icons/md";

interface InitProps {
    children?: React.ReactNode;
}

export default function Init(props: InitProps) {
  const {openSidebar, setOpenSidebar} = useSidebar();
  const [search, setSearch] = useState("")
  const searching = search.trim()

  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
        <aside className={`flex flex-col duration-300 bg-gray-900 rounded-l-[8px] text-gray-300 ${!openSidebar ? 'w-66' : 'w-20'} p-3 border-x border-t border-gray-400`}>
          <nav className="flex flex-col gap-2">

            <NavLink to="/" className={`flex items-center gap-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-10 mt-2 hover:text-blue-200`}>
              <img title="Início" src="/image.png" alt="Ícone" className={`${openSidebar && 'ml-2'} duration-200`} width={36} height={36}/>
              <p className={`${openSidebar && 'scale-0'} duration-200`}>TaskMaster</p>
            </NavLink>

            <div className="flex items-center gap-2 bg-zinc-500 rounded-[8px] px-2 py-3 mb-1.5">
              <BsSearch className={`text-2xl text-white block float-left hover:cursor-pointer mr-0.5 ${openSidebar && 'ml-2'} duration-200`}
              onClick={() => {if (openSidebar) setOpenSidebar(false)}} />
              <input type="search" value={search} id="search" onChange={(text) => setSearch(text.target.value) } className={`text-white bg-transparent focus:outline-none ${openSidebar && 'hidden'} duration-200 w-full`} placeholder="Pesquisar" />
            </div>

            <NavLink to="/novatarefa" className={`font-semibold text-lg flex gap-2 items-center text-white p-2 rounded-[8px] mb-1.5 hover:bg-zinc-400`}>
              <IoAddCircleOutline className={`text-2xl text-white block float-left hover:cursor-pointer mr-0.5 ${openSidebar && 'ml-1 text-3xl'} duration-200`} />
              <p className={`${openSidebar && 'hidden'} duration-200`}>Nova tarefa</p>
            </NavLink>

            <NavLink to="/listatarefas" className={`font-semibold text-lg flex gap-2 items-center text-white p-2 rounded-[8px] mt-6 mb-1.5 hover:bg-zinc-400`}>
              <FaTasks className={`text-2xl text-white block float-left hover:cursor-pointer mr-0.5 ${openSidebar && 'ml-2'} duration-200`} />
              <p className={`${openSidebar && 'hidden'} duration-200`}>Tarefas</p>
            </NavLink>

            <NavLink to="/concluidas" className={`font-semibold text-lg flex gap-2 items-center text-white p-2 rounded-[8px] mb-1.5 hover:bg-zinc-400`}>
              <MdTaskAlt className={`text-2xl text-white block float-left hover:cursor-pointer mr-0.5 ${openSidebar && 'ml-1 text-3xl'} duration-200`} />
              <p className={`${openSidebar && 'hidden'} duration-200`}>Concluídas</p>
            </NavLink>

            <NavLink to="/atrasadas" className={`font-semibold text-lg flex gap-2 items-center text-white p-2 rounded-[8px] mb-1.5 hover:bg-zinc-400`}>
              <IoAlertCircleOutline className={`text-2xl text-white block float-left hover:cursor-pointer mr-0.5 ${openSidebar && 'ml-1 text-3xl'} duration-200`} />
              <p className={`${openSidebar && 'hidden'} duration-200`}>Atrasadas</p>
            </NavLink>

          </nav>
        </aside>

        <div className="flex flex-col flex-1">
            <header className="bg-stone-950 flex justify-between p-6 items-center border-y border-gray-400 rounded-tr-[8px]">
              <FiMenu title={`${!openSidebar ? 'Fechar Menu' : 'Abrir Menu'}`}  className="text-3xl hover:cursor-pointer hover:text-blue-200" onClick={() => setOpenSidebar(!openSidebar)}/>
              <h2 className="text-cyan-100 text-lg">Bem vindo ao seu app To-do!</h2>
            </header>

            <div className="flex-1">

            <div className="p-5 min-h-[550px] max-h-[calc(100vh-90px)] overflow-y-auto scrollbar scrollbar-thumb-gray-800 scrollbar-hover:scrollbar-thumb-slate-700">
                  <div>
                      {searching !== "" && <SearchingResults search={searching}></SearchingResults>} 
                      {searching === "" && props.children}
                  </div >
              </div>

          </div>

        </div>
    </div>
  );
}
