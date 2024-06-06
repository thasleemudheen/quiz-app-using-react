import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Quiz from './components/Quiz';
import Settings from './components/Settings';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Settings />} />
              <Route path="/questions/:difficulty" element={<Quiz />} />
          </Routes>
      </Router>
  );
}

export default App;
