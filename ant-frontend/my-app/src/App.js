import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Configuration from './components/Configuration';
import UploadModal from './components/UploadModal';

function App() {
  return (
    <Router>
      <UploadModal /> {/* This makes UploadModal available globally */}
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/configuration" element={<Configuration />} />
        {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
}

export default App;
