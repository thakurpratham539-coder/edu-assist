import React, { useEffect, useState } from 'react';
import { Globe, ArrowRight, Bot, Code, Zap, GraduationCap } from 'lucide-react';
import styles from './LandingPage.module.css';

const LandingPage = ({ onLaunch, toggleTheme, theme }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleExploreCode = () => {
    window.open('https://github.com/thakurpratham539-coder/edu-assist', '_blank');
  };

  return (
    <div className={`${styles.container} ${visible ? styles.loaded : ''}`}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIconWrap}>
            <Bot size={22} className={styles.logoIcon} />
          </div>
          <span>EduAssist Neo</span>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className={styles.exploreBtn} onClick={handleExploreCode}>
          <Globe size={16} />
          Explore Code
        </button>
      </header>

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Zap size={13} className={styles.badgeIcon} />
            <span>AI-Powered College Guidance</span>
          </div>

          <h1 className={styles.title}>
            Your AI guide to<br />
            <span className={styles.highlight}>new-gen colleges</span>
          </h1>

          <div className={styles.collegeRow}>
            {['Scaler', 'NST', 'Vedam', 'NIAT'].map((c, i) => (
              <span key={i} className={styles.collegeName}>{c}</span>
            ))}
          </div>

          <p className={styles.subtitle}>
            Instant fee comparisons, scholarship insights, placement stats &amp; mock interviews — built for future tech leaders.
          </p>

          <div className={styles.pills}>
            {['Fees & Aid', 'Side-by-side compare', 'Mock interview', 'SAT accepted', 'Placements', 'Scholarships'].map((pill, i) => (
              <span key={i} className={styles.pill} style={{ animationDelay: `${0.4 + i * 0.07}s` }}>{pill}</span>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={onLaunch}>
              Launch Assistant
              <ArrowRight size={18} />
            </button>
            <button className={styles.secondaryBtn} onClick={handleExploreCode}>
              <Code size={18} />
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
              <strong>⚡</strong> Instant Answers
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className={styles.heroVisual}>
          <div className={styles.glowOrb}></div>

          <div className={styles.floatingCard} style={{ top: '8%', right: '8%', animationDelay: '0s' }}>
            <div className={styles.cardIcon}>💰</div>
            <div>
              <h4>100% Scholarship</h4>
              <p><span className={styles.cardLiveDot}></span>Available on merit</p>
            </div>
          </div>

          <div className={styles.floatingCard} style={{ top: '34%', left: '0%', animationDelay: '1.2s' }}>
            <div className={styles.cardIcon}>🏆</div>
            <div>
              <h4>Google · Amazon</h4>
              <p><span className={styles.cardLiveDot}></span>Top recruiters</p>
            </div>
          </div>

          <div className={styles.floatingCard} style={{ bottom: '28%', right: '4%', animationDelay: '2.1s' }}>
            <div className={styles.cardIcon}>🎓</div>
            <div>
              <h4>SAT Accepted</h4>
              <p><span className={styles.cardLiveDot}></span>No JEE required</p>
            </div>
          </div>

          <div className={styles.floatingCard} style={{ bottom: '6%', left: '12%', animationDelay: '1.7s' }}>
            <div className={styles.cardIcon}>⚡</div>
            <div>
              <h4>4 Colleges</h4>
              <p><span className={styles.cardLiveDot}></span>Compared instantly</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <GraduationCap size={16} className={styles.footerIcon} />
            <span>EduAssist Neo</span>
          </div>
          <p className={styles.madeBy}>
            Crafted with <span className={styles.heart}>♥</span> by{' '}
            <span className={styles.authorName}>Prathamesh Thakur</span>
          </p>
          <div className={styles.footerRight}>
            <span>© 2025 All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
