// import logo from './logo.svg';
import './App.css';
// import Number from './components/Number';
import { ContextProvider } from './context/ContextProvider';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useState } from 'react';
import Login from './pages/Login';
import Number from './components/Number';
import Header from './components/Header';
import Application from './pages/Application';
import Task from './pages/Task';
import Sorter from './pages/Sorter';
import Lines from './pages/Lines';
import Rearrange from './pages/Rearrange';
import NewReorder from './pages/NewReorder';

function App() {
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <ContextProvider>
      <div className="App bg-[#f4f6f8] dark:bg-[#111827] h-screen">
        
        <Routes>

          <Route path="/sorter" element={<Sorter />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks/1" element={<Task />} />
          <Route path="/application" element={<Application />} />
          <Route path="/number" element={<Number />} />
          <Route path="/lines" element={<Lines />} />
          <Route path="/rearrange" element={<Rearrange />} />
          <Route path="/newreorder" element={<NewReorder />} />
          <Route path="/" element={loggedIn ? <Navigate to="/application" /> : <Login />} />
        </Routes>
      </div>
    </ContextProvider>

  );
}

export default App;
