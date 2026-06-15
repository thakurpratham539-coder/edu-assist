import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Loader2, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateChatResponse } from '../utils/chatbotLogic';
import styles from './Chatbot.module.css';

const SUGGESTIONS = [
  "Compare Scaler and NST",
  "What is the fee for Vedam?",
  "NIAT placements",
  "Start mock interview"
];

const Chatbot = ({ onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Welcome to EduAssist Neo! I can help you with fee details, placements, and comparisons between Scaler, NST, Vedam, and NIAT. How can I help?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate network delay for a more natural feel
    setTimeout(() => {
      try {
        const { intent, response } = generateChatResponse(text);
        
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: response,
          intent: intent
        };
        setMessages(prev => [...prev, botMsg]);
      } catch (error) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'bot',
          text: "An error occurred while generating the response."
        }]);
      } finally {
        setIsLoading(false);
      }
    }, 600);
  };

  const handleExploreCode = () => {
    window.open('https://github.com/thakurpratham539-coder/edu-assist', '_blank');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button onClick={onBack} className={styles.backBtn}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles.botInfo}>
            <div className={styles.avatarWrap}>
              <Bot size={20} className={styles.avatarIcon} />
              <span className={styles.statusDot}></span>
            </div>
            <div>
              <h2 className={styles.botName}>EduAssist AI</h2>
              <p className={styles.botStatus}>Online · Ready to help</p>
            </div>
          </div>
        </div>
        <button className={styles.exploreBtn} onClick={handleExploreCode}>
          <Globe size={18} />
          Explore Code
        </button>
      </header>

      {/* Chat Area */}
      <main className={styles.chatArea}>
        <div className={styles.messagesList}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.messageWrapper} ${msg.sender === 'user' ? styles.userWrapper : styles.botWrapper}`}>
              {msg.sender === 'bot' && (
                <div className={styles.msgAvatar}>
                  <Bot size={18} />
                </div>
              )}
              <div className={`${styles.message} ${msg.sender === 'user' ? styles.userMsg : styles.botMsg}`}>
                {msg.sender === 'bot' ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.markdown}>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
                {msg.intent && msg.intent === 'mock_interview' && (
                  <div className={styles.mockActions}>
                    <button className={styles.mockBtn} onClick={() => handleSend("Yes, let's start")}>Start</button>
                    <button className={styles.mockBtn} onClick={() => handleSend("Maybe later")}>Later</button>
                  </div>
                )}
              </div>
              {msg.sender === 'user' && (
                <div className={styles.msgAvatarUser}>
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
              <div className={styles.msgAvatar}>
                <Bot size={18} />
              </div>
              <div className={`${styles.message} ${styles.botMsg}`}>
                <div className={styles.typingIndicator}>
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length < 3 && (
          <div className={styles.suggestions}>
            {SUGGESTIONS.map((s, i) => (
              <button key={i} className={styles.suggestionChip} onClick={() => handleSend(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className={styles.inputArea}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask about fees, placements, or comparisons..."
              className={styles.input}
              disabled={isLoading}
            />
            <button 
              className={styles.sendBtn} 
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? <Loader2 size={20} className={styles.spin} /> : <Send size={20} />}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
