import React from 'react';
import { Globe, ArrowRight, Bot, Code, Zap } from 'lucide-react';
import styles from './LandingPage.module.css';

const LandingPage = ({ onLaunch }) => {
  const handleExploreCode = () => {
    window.open('https://github.com/thakurpratham539-coder/edu-assist', '_blank');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Bot size={28} className={styles.logoIcon} />
          <span>EduAssist Neo</span>
        </div>
        <button className={styles.exploreBtn} onClick={handleExploreCode}>
          <Globe size={18} />
          Explore Code
        </button>
      </header>

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Zap size={14} className={styles.badgeIcon} />
            <span>AI Powered College Guidance</span>
          </div>
          <h1 className={styles.title}>
            Your AI guide to<br />
            <span className={styles.highlight}>Scaler · NST · Vedam · NIAT</span>
          </h1>
          <p className={styles.subtitle}>
            Instant fee comparisons, scholarship insights, placement stats & mock interviews for future tech leaders.
          </p>
          
          <div className={styles.pills}>
            {['Fees & Aid', 'Side-by-side compare', 'Mock interview', 'SAT accepted', 'Placements', 'Scholarships'].map((pill, i) => (
              <span key={i} className={styles.pill}>{pill}</span>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={onLaunch}>
              Launch Assistant
              <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryBtn} onClick={handleExploreCode}>
              <Code size={20} />
              View Source
            </button>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <strong>4</strong> Elite Colleges
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statItem}>
              <strong>100%</strong> Free to Use
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statItem}>
              <strong>∞</strong> Instant Answers
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.floatingCard} style={{ top: '10%', right: '10%', animationDelay: '0s' }}>
            <div className={styles.cardIcon}>₹</div>
            <div>
              <h4>100% scholarship</h4>
              <p>Available on merit</p>
            </div>
          </div>
          
          <div className={styles.floatingCard} style={{ top: '35%', left: '0', animationDelay: '1s' }}>
            <div className={styles.cardIcon}>💼</div>
            <div>
              <h4>Google · Amazon</h4>
              <p>Top recruiters</p>
            </div>
          </div>

          <div className={styles.floatingCard} style={{ bottom: '30%', right: '5%', animationDelay: '2s' }}>
            <div className={styles.cardIcon}>🎓</div>
            <div>
              <h4>SAT accepted</h4>
              <p>No JEE required</p>
            </div>
          </div>

          <div className={styles.floatingCard} style={{ bottom: '5%', left: '15%', animationDelay: '1.5s' }}>
            <div className={styles.cardIcon}>⚖️</div>
            <div>
              <h4>4 colleges</h4>
              <p>Compared instantly</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
