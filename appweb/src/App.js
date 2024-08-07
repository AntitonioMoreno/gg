import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import NotFound from './views/Home';
import HomeUser from './views/HomeUser';
import SurveyProtected from './surveyProtected';
import Wallet from './views/Wallet';
import { LineGraph } from './components/misc/Graph';
import { GgInformation } from './views/GgInformation';
import { Survey } from './components/misc/survey';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<HomeUser />} />
        <Route
          path="/minigames"
          element={<SurveyProtected component={HomeUser} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<HomeUser />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/Wallet' element={<Wallet />} />
        <Route path='/graph' element={<LineGraph />} />
        <Route path='/GoodGuys' element={<GgInformation />} />
        <Route path='/survey' element={<Survey />} />
      </Routes>
    </Router>
  );
}

export default App;
