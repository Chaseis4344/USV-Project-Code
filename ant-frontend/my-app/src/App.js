import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Configuration from './components/Configuration';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/configuration" element={<Configuration />} />
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
}

export default App;