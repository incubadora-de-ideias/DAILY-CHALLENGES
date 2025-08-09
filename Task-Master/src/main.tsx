import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { TasksProvider } from "./contexts/TasksContext";
import './style.css'
import { SidebarProvider } from './contexts/SidebarContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider> 
      <TasksProvider>
        <App />
      </TasksProvider>
    </SidebarProvider>
  </StrictMode>,
)
