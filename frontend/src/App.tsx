import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/registration" element={ <Registration /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="*" element={ <Navigate to="/" /> } />
    </Routes>
  );
}
