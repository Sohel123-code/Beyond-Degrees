import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CareerPathsHome from './pages/CareerPaths/CareerPathsHome';
import StreamCareers from './pages/CareerPaths/StreamCareers';
import CareerDetail from './pages/CareerPaths/CareerDetail';
import ConceptHub from './pages/ConceptHub/ConceptHub';
import ConceptCategory from './pages/ConceptHub/ConceptCategory';
import GradBuddy from './pages/GradBuddy/GradBuddy';
import FloatingBuddy from './components/FloatingBuddy';
import IntroVideo from './components/IntroVideo';
import './App.css';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="App">
      <IntroVideo />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career-paths" element={<CareerPathsHome />} />
        <Route path="/career-paths/:stream" element={<StreamCareers />} />
        <Route path="/career-paths/:stream/:careerId" element={<CareerDetail />} />
        <Route path="/concept-hub" element={<ConceptHub />} />
        <Route path="/concept-hub/:categoryId" element={<ConceptCategory />} />
        <Route path="/gradbuddy" element={<GradBuddy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingBuddy />
    </div>
  );
}

export default App;
