import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {

  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={token ? <Navigate to="/dashboard" /> : <Login />}></Route>
        <Route path='/register' element={token ? <Navigate to="/dashboard" /> : <Register />}></Route>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App