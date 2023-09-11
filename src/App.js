import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './register/Login';
import Register from './register/Register'
import Dashboard from './register/Dashboard'
import User from './register/User';
import CRUD from './register/CRUD';
function App() {
  return (
    <>
      <div className="App">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/user">User</a></li>
          <li><a href="/crud">CRUD</a></li>
        </ul>
      </div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/user' element={<User />} />
            <Route path='/crud' element={<CRUD />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
