import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import './globalStyle.css';

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
