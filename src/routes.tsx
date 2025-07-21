

import {BrowserRouter , Routes, Route, Navigate }  from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import  Home  from './pages/Home'
import { TarefasDone } from './pages/TarefasDone'
import { TarefaDelay } from './pages/TarefaDelay'

export const AppRoutes = ()=>{

    return(

        <BrowserRouter>
        <Routes>

            <Route path='Pagina Inicial'  element={<Dashboard/>}/>
            <Route path='home'  element={<Home/>}/>
            <Route path='TarefasConcluidas'  element={<TarefasDone/>}/>
            <Route path='TarefasAtrasadas'  element={<TarefaDelay/>}/>
            <Route path='*'  element={<Navigate to='/Pagina Inicial'/>}/>
  
        </Routes>
        </BrowserRouter>
    )
}