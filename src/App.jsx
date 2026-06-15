import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Chatbot from './components/Chatbot';

function App() {
  const [showChat, setShowChat] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('edu-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('edu-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <>
      {showChat ? (
        <Chatbot onBack={() => setShowChat(false)} toggleTheme={toggleTheme} theme={theme} />
      ) : (
        <LandingPage onLaunch={() => setShowChat(true)} toggleTheme={toggleTheme} theme={theme} />
      )}
    </>
  );
}

export default App;
