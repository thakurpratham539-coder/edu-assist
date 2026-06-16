<div align="center">

# 🎓 EduAssist Neo

### AI-Powered College Guidance for New-Gen Tech Colleges

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/livedashboardsite/edu-assist-neo)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br />

> Instant fee comparisons, scholarship insights, placement stats & mock interviews —  
> built for students exploring India's best new-generation tech colleges.

<br />

<br />

<a href="https://livedashboardsite.github.io/edu-assist-neo/">
  <img src="https://img.shields.io/badge/🌐%20LIVE%20DEMO-Click%20to%20Explore-8b5cf6?style=for-the-badge&labelColor=18181b&logo=googlechrome&logoColor=white" alt="Live Demo" height="50"/>
</a>

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Chatbot** | Rule-based intelligent assistant with 30+ specific Q&A pairs |
| 💰 **Fee Comparison** | Side-by-side fee breakdown for all 4 colleges |
| 🏆 **Scholarship Guide** | Detailed merit & need-based scholarship info |
| 🚀 **Placement Stats** | Recruiter lists, internship details & placement support |
| 📝 **Admission Help** | Step-by-step guidance for NSET, NSAT, VSAT & NAT |
| 🎯 **Smart Suggestions** | Rotating question chips with instant answers |
| 📊 **Side-by-Side Compare** | Full comparison table across all colleges |
| 🎨 **Animated UI** | Floating cards, shimmer effects & live indicators |
| 🌗 **Light / Dark Theme** | Toggle between themes, preference saved automatically |

---

## 🏫 Colleges Covered

<table>
  <tr>
    <td align="center"><b>⚡ Scaler SST</b><br/>Bangalore<br/>~₹17L fee</td>
    <td align="center"><b>🎓 NST</b><br/>Delhi · Pune · Bengaluru<br/>₹23–24L fee</td>
    <td align="center"><b>💡 Vedam</b><br/>Gurugram · Pune<br/>~₹18L fee</td>
    <td align="center"><b>🏆 NIAT</b><br/>30+ cities<br/>₹8–18L fee</td>
  </tr>
</table>

All colleges offer **up to 100% merit-based scholarships** — no JEE required!

---

## 🛠️ Tech Stack

```
Frontend    →  React 18 + Vite
Styling     →  CSS Modules (dark/light theme, glass morphism)
Markdown    →  react-markdown + remark-gfm
Icons       →  lucide-react
Routing     →  Single-page app (no router needed)
Deployment  →  GitHub Pages via GitHub Actions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/livedashboardsite/edu-assist-neo.git
cd edu-assist-neo

# Install dependencies
npm install

# Start development server
npm run dev
```

Open the link in the browser.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
edu-assist-neo/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx        # Hero page with animated floating cards
│   │   ├── LandingPage.module.css # Landing page styles & animations
│   │   ├── Chatbot.jsx            # Chat interface with side panels
│   │   └── Chatbot.module.css     # Chatbot styles & side animations
│   ├── utils/
│   │   └── chatbotLogic.js        # Intent detection + 30+ Q&A answers
│   ├── data/
│   │   └── colleges.json          # College data (fees, scholarships, placements)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                  # Global styles, dark/light theme variables
├── public/
├── vite.config.js
└── package.json
```

---

## 💬 Sample Questions You Can Ask

```
💰 Fee & Cost
  "What is the fee at Scaler School of Technology?"
  "What is the fee range at NIAT?"
  "Compare Scaler vs NST fees"

🏆 Scholarships
  "Does Scaler offer 100% scholarship?"
  "Does NST offer women-only scholarships?"
  "Which college has the best scholarship?"

🚀 Placements
  "What are Scaler's top placement companies?"
  "NST vs NIAT — which has better placements?"
  "Does NIAT guarantee placements?"

📝 Admissions
  "How to apply for NSET at Scaler?"
  "How to crack the NSAT exam?"
  "Does Vedam accept SAT scores?"

📊 Comparisons
  "Compare all 4 colleges side by side"
  "Scaler vs Vedam — which is better for CS?"
  "Which new-gen college is best for girls?"
```

---

## 🎨 UI Highlights

- **Dark & light glassmorphism** design with purple/blue gradient accents
- **Animated floating cards** on the hero with shimmer lines, icon pulses & live dots
- **Orbital ring animations** around the hero visual
- **Side panel widgets** in the chatbot showing live college stats
- **Chip suggestions** that shuffle after every message
- **Typing indicator** with bouncing dots while bot "thinks"
- **Markdown rendering** for rich formatted bot responses including tables

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

### Ideas for contributions
- Add more colleges (Plaksha, Krea, Flame, etc.)
- Integrate a real AI API (Claude, Gemini, GPT)
- Add a college ranking/filter page
- Mobile app version

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify and distribute.

---

<div align="center">

Crafted with ♥ by **Prathamesh Thakur**

⭐ Star this repo if you found it helpful!

[![Star](https://img.shields.io/github/stars/livedashboardsite/edu-assist-neo?style=social)](https://github.com/livedashboardsite/edu-assist-neo)

</div>
