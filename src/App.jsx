import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Chatbot from './components/Chatbot';

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {showChat ? (
        <Chatbot onBack={() => setShowChat(false)} />
      ) : (
        <LandingPage onLaunch={() => setShowChat(true)} />
      )}
    </>
  );
}

export default App;
