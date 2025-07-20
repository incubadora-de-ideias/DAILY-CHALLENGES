

import {BrowserRouter , Routes, Route, Navigate }  from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import  Home  from './pages/Home'

export const AppRoutes = ()=>{

    return(

        <BrowserRouter>
        <Routes>

            <Route path='Pagina Inicial'  element={<Dashboard/>}/>
            <Route path='home'  element={<Home/>}/>
            <Route path='*'  element={<Navigate to='/Pagina Inicial'/>}/>
  
        </Routes>
        </BrowserRouter>
    )
}