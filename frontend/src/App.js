// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './Components/CourseList';
import Assignment from './Components/Assignment'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/assignments/:courseId" element={<Assignment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
