import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Minigames from './views/ViewMinigames';
import Login from './views/Login';
import Register from './views/Register';
import HelloWorld from './views/helloWorld';
import NotFound from './views/Home';
import HomeUser from './views/HomeUser';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Home />} />
        <Route path="/minigames" element={<Minigames />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={ <ProtectedRoute element={<HomeUser />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
