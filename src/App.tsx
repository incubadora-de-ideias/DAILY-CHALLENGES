import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { TaskForm } from './components/TaskFom';
import { TaskList } from './pages/TaskList';

export const App: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-900 text-black'>
      <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/nova" element={<TaskForm />} />
      <Route path="/editar/:id" element={<TaskForm />} />
      <Route path="/lista" element={<TaskList />} />
    </Routes>
    </div>
  );
};

export default App;
