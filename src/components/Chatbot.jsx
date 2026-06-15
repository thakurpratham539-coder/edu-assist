import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Loader2, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateChatResponse } from '../utils/chatbotLogic';
import styles from './Chatbot.module.css';

// Full pool of college-specific suggestions
const ALL_SUGGESTIONS = [
  // Scaler
  "What is the fee at Scaler School of Technology?",
  "How to apply for NSET at Scaler?",
  "Does Scaler offer 100% scholarship?",
  "What are Scaler's top placement companies?",
  "What makes Scaler different from IITs?",

  //NST
  "What is the fee structure at NST?",
  "How to crack the NSAT exam?",
  "Does NST offer women-only scholarships?",
  "Which universities partner with NST?",
  "What is 1:1 mentorship at NST?",

  // Vedam
  "What is the fee at Vedam college?",
  "How to appear for VSAT?",
  "Does Vedam accept SAT scores?",
  "Who mentors students at Vedam?",
  "What is Vedam's coding-from-day-one approach?",

  // NIAT
  "What is the fee range at NIAT?",
  "How does NIAT's upskilling program work?",
  "Which universities are NIAT partners?",
  "What is the NxtWave Assessment Test?",
  "Does NIAT guarantee placements?",

  // Comparisons
  "Compare Scaler vs NST fees",
  "Scaler vs Vedam — which is better for CS?",
  "NST vs NIAT — which has better placements?",
  "Which college has the best scholarship?",
  "Which new-gen college is best for girls?",
  "Compare all 4 colleges side by side",
];

function getShuffled(exclude = []) {
  const pool = ALL_SUGGESTIONS.filter(s => !exclude.includes(s));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}

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
  const [suggestions, setSuggestions] = useState(() => getShuffled());
  const [chipsVisible, setChipsVisible] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const shuffleSuggestions = (usedText) => {
    setChipsVisible(false);
    setTimeout(() => {
      setSuggestions(getShuffled([usedText]));
      setChipsVisible(true);
    }, 300);
  };

  const handleSend = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), sender: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    shuffleSuggestions(trimmed);

    setTimeout(() => {
      try {
        const { intent, response } = generateChatResponse(trimmed);
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
              <Bot size={18} className={styles.avatarIcon} />
              <span className={styles.statusDot}></span>
            </div>
            <div>
              <h2 className={styles.botName}>EduAssist AI</h2>
              <p className={styles.botStatus}>Online · Ready to help</p>
            </div>
          </div>
        </div>
        <button className={styles.exploreBtn} onClick={handleExploreCode}>
          <Globe size={16} />
          Explore Code
        </button>
      </header>

      {/* Chat Area */}
      <main className={styles.chatArea}>
        <div className={styles.messagesList}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageWrapper} ${msg.sender === 'user' ? styles.userWrapper : styles.botWrapper}`}
            >
              {msg.sender === 'bot' && (
                <div className={styles.msgAvatar}>
                  <Bot size={16} />
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
                {msg.intent === 'mock_interview' && (
                  <div className={styles.mockActions}>
                    <button className={styles.mockBtn} onClick={() => handleSend("Yes, let's start")}>Start</button>
                    <button className={styles.mockBtn} onClick={() => handleSend("Maybe later")}>Later</button>
                  </div>
                )}
              </div>
              {msg.sender === 'user' && (
                <div className={styles.msgAvatarUser}>
                  <User size={16} />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
              <div className={styles.msgAvatar}>
                <Bot size={16} />
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

        {/* Shuffling Suggestions — always visible */}
        <div className={`${styles.suggestions} ${chipsVisible ? styles.chipsIn : styles.chipsOut}`}>
          {suggestions.map((s, i) => (
            <button
              key={s}
              className={styles.suggestionChip}
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => handleSend(s)}
              disabled={isLoading}
            >
              {s}
            </button>
          ))}
        </div>

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
              {isLoading ? <Loader2 size={18} className={styles.spin} /> : <Send size={18} />}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
