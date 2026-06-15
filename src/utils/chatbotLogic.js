import COLLEGES_DATA from '../data/colleges.json';

const INTENTS = {
  "comparison": ["compare", "difference between", "which is better", "vs", "versus", "side by side"],
  "fee": ["fee", "cost", "price", "how much", "tuition", "expenses", "fee structure", "fee range"],
  "scholarship": ["scholarship", "financial aid", "discount", "waiver", "free", "merit", "women-only", "women only"],
  "placement": ["placement", "jobs", "hiring", "salary", "companies", "recruiters", "packages", "guarantee"],
  "admission": ["apply", "application", "how to", "exam", "test", "crack", "appear", "nset", "nsat", "vsat", "nat", "admission", "selection"],
  "mentorship": ["mentor", "mentorship", "1:1", "1 on 1", "coaching"],
  "greeting": ["hi", "hello", "hey", "good morning", "good evening", "how are you"],
  "mock_interview": ["mock interview", "start interview", "practice interview"]
};

function detectIntent(query) {
  const queryLower = query.toLowerCase();
  let bestIntent = "unknown";
  let maxMatches = 0;

  for (const [intent, phrases] of Object.entries(INTENTS)) {
    let matchCount = 0;
    for (const phrase of phrases) {
      if (queryLower.includes(phrase)) matchCount++;
    }
    if (matchCount > maxMatches) {
      maxMatches = matchCount;
      bestIntent = intent;
    }
  }
  return bestIntent;
}

function extractColleges(query) {
  const queryLower = query.toLowerCase();
  const detected = [];
  const altNames = {
    "sst": "Scaler", "scaler": "Scaler",
    "nst": "NST", "newton": "NST", "newton school": "NST",
    "vedam": "Vedam", "vst": "Vedam",
    "niat": "NIAT", "nxtwave": "NIAT"
  };
  const words = queryLower.match(/\b\w+\b/g) || [];
  for (const word of words) {
    if (altNames[word] && !detected.includes(altNames[word])) {
      detected.push(altNames[word]);
    }
  }
  // Also check for "all 4" or "all colleges"
  if (queryLower.includes("all 4") || queryLower.includes("all four") || queryLower.includes("all colleges") || queryLower.includes("side by side")) {
    return ["Scaler", "NST", "Vedam", "NIAT"];
  }
  return detected;
}

// ── Specific question handlers for the suggestion chips ──────────────────────

const SPECIFIC_ANSWERS = {
  // Scaler
  "what is the fee at scaler school of technology": () =>
    `### 💰 Scaler School of Technology — Fee\n\n**Total Fee:** ~₹17 Lakh for the full 4-year UG program.\n\n- Includes tuition, campus access & mentorship\n- EMI & loan options available\n- Scholarships can reduce it to **₹0** for top scorers`,

  "how to apply for nset at scaler": () =>
    `### 📝 How to Apply for NSET at Scaler\n\n1. Register on the **Scaler School of Technology** website\n2. Appear for the **NSET (National Scholarship & Entrance Test)** — held multiple times a year\n3. Clear the aptitude test (Math, Logical Reasoning, English)\n4. Attend a **personal interview** round\n5. Receive your admission offer & scholarship details\n\n*NSET is free to take and tests foundational skills — not JEE-level prep!*`,

  "does scaler offer 100% scholarship": () =>
    `### 🏆 Scaler Scholarship Details\n\n**Yes!** Scaler offers merit-based scholarships that can cover **100% of tuition**:\n\n| Scholarship Type | Coverage |\n|---|---|\n| JEE / BITSAT merit | Up to 100% |\n| SAT merit | Up to 100% |\n| Sports achievement | Partial |\n| Need-based | Partial |\n\n*Scholarships are awarded based on NSET performance + interview.*`,

  "what are scaler's top placement companies": () =>
    `### 🚀 Scaler Top Placement Companies\n\n**100% placement assistance** is guaranteed. Top recruiters include:\n\n**Product Companies:** Google · Microsoft · Amazon · Meta · Flipkart\n\n**Internships:** Mandatory internship built into curriculum\n\n**Package Range:** ₹10–40 LPA (fresher average)\n\n*Students get placement prep, mock interviews, and referrals.*`,

  "what makes scaler different from iits": () =>
    `### ⚡ Scaler vs IITs — Key Differences\n\n| Aspect | Scaler SST | IITs |\n|---|---|---|\n| Admission | NSET (accessible) | JEE Advanced (very hard) |\n| Fee | ~₹17 Lakh | ₹8–12 Lakh |\n| Focus | Industry-first, practical | Theory + research |\n| Batch size | Small cohorts | 100–300/branch |\n| Mentors | Active tech professionals | Academics |\n| Placements | 100% assistance | Strong brand, self-driven |\n\n*Scaler is designed for students who want direct industry entry without the IIT grind.*`,

  // NST
  "what is the fee structure at nst": () =>
    `### 💰 NST (Newton School of Technology) — Fee\n\n**Total Fee:** ₹23.25 Lakh – ₹24.4 Lakh for 4 years\n\n- Includes university tuition + NxtWave upskilling program\n- Scholarships can bring this down significantly (up to 100%)\n- Partner universities: Rishihood, Ajeenkya DY Patil, S-VYASA`,

  "how to crack the nsat exam": () =>
    `### 📝 How to Crack the NSAT (Newton School Admission Test)\n\n**Topics covered:**\n- Quantitative Aptitude (arithmetic, algebra)\n- Logical Reasoning\n- English comprehension\n\n**Tips:**\n1. Practice aptitude mock tests online (IndiaBix, PrepInsta)\n2. Solve 30–40 questions/day in each section\n3. Focus on speed + accuracy — it's timed\n4. Review past NSAT patterns on their official site\n\n*NSAT is moderate difficulty — no JEE prep needed!*`,

  "does nst offer women-only scholarships": () =>
    `### 👩‍💻 NST Women-Only Scholarships\n\n**Yes!** NST has the **Young Women Leader Scholarship** specifically for female applicants:\n\n| Scholarship | Eligibility | Coverage |\n|---|---|---|\n| JEE Excellence | JEE rank holders | **100%** |\n| Young Women Leader | Female students | Significant % |\n| Merit-based | NSAT performance | Varies |\n| Extraordinary Achievement | Sports/Olympiad | Varies |\n\n*NST actively promotes diversity in tech — women applicants get additional support.*`,

  "which universities partner with nst": () =>
    `### 🎓 NST Partner Universities\n\nNST students get a degree from one of these UGC-recognized institutions:\n\n- **Rishihood University** (NCR)\n- **Ajeenkya DY Patil University** (Pune)\n- **S-VYASA University** (Bengaluru)\n\n*The degree is valid and recognized. NST's curriculum runs alongside it.*`,

  "what is 1:1 mentorship at nst": () =>
    `### 🤝 1:1 Mentorship at NST\n\nNST's signature **1:1 Mentorship Program** pairs every student with an industry professional:\n\n- Mentor is an **active tech professional** (engineer, PM, founder)\n- Regular 1-on-1 sessions for career guidance\n- Help with projects, interview prep, and industry networking\n- Mentors come from companies like **Google, Amazon, startups**\n\n*This is one of NST's biggest differentiators from traditional colleges.*`,

  // Vedam
  "what is the fee at vedam college": () =>
    `### 💰 Vedam — Fee Structure\n\n**Total Fee:** ~₹18 Lakh for 4 years\n\n- Competitive with other new-gen colleges\n- Scholarships available (up to 100% merit-based)\n- Located in Gurugram & Pune\n\n*Vedam was established in 2025, so it's a new institution with fresh, modern curriculum.*`,

  "how to appear for vsat": () =>
    `### 📝 How to Appear for VSAT (Vedam Scholastic Aptitude Test)\n\n1. Apply on the **Vedam** official website\n2. Register for the VSAT — conducted online\n3. Sections: Quantitative Aptitude · Logical Reasoning · English\n4. Clear the VSAT cutoff\n5. Attend a **Personal Interview** round\n6. Receive merit-based scholarship offer\n\n*VSAT is accessible — designed for motivated students, not just JEE toppers.*`,

  "does vedam accept sat scores": () =>
    `### 🌍 Vedam & SAT Scores\n\n**Yes!** Vedam accepts **SAT scores** as part of their admission process — a rare feature among Indian tech colleges.\n\n- Great for students who've taken SAT for international applications\n- Replaces or supplements VSAT performance\n- Also accepts merit from other national exams\n\n*This makes Vedam a top choice for students with international test prep background.*`,

  "who mentors students at vedam": () =>
    `### 👨‍💼 Vedam Mentors\n\nVedam's faculty and mentors are ex-professionals from:\n\n- **Google** — Senior Engineers & PMs\n- **Microsoft** — Technical leads\n- **Top Indian startups** — Founders & CTOs\n\n*The "coding from day one" approach means mentors focus on real-world engineering skills, not just textbook theory.*`,

  "what is vedam's coding-from-day-one approach": () =>
    `### 💻 Vedam's "Coding From Day One" Approach\n\nUnlike traditional colleges that start with theory, Vedam:\n\n- Starts **coding on Day 1** of the program\n- Curriculum is project-based, not exam-based\n- Students build real products within the first semester\n- **6-month paid internships** are part of the program\n- Mentored by ex-Google/Microsoft professionals throughout\n\n*Think of it like a coding bootcamp combined with a full degree — intense and industry-focused.*`,

  // NIAT
  "what is the fee range at niat": () =>
    `### 💰 NIAT — Fee Structure\n\n**Fee Range:** ₹8 Lakh – ₹18 Lakh (depends on partner university)\n\n- **Lowest** among all 4 new-gen colleges\n- Fee varies by which partner university you join\n- Upskilling program fees are separate but scholarship-eligible (up to 100%)\n\n*Best option if budget is a primary concern.*`,

  "how does niat's upskilling program work": () =>
    `### ⚡ NIAT Upskilling Program — How It Works\n\nNIAT combines a **traditional degree + NxtWave tech upskilling**:\n\n1. **Year 1–4:** Pursue regular UG degree at a partner university (UGC-recognized)\n2. **Parallel:** Complete NxtWave's intensive tech curriculum (full-stack, AI, DSA)\n3. **Assessment:** NxtWave Assessment Test (NAT) determines scholarship level\n4. **Outcome:** Dual credential — a degree + industry-ready skills\n\n*You get the best of both worlds: a recognized degree + a modern tech education.*`,

  "which universities are niat partners": () =>
    `### 🎓 NIAT Partner Universities\n\nNIAT works with **30+ UGC-recognized universities** across India, including:\n\n- Universities in **Telangana, AP, Karnataka, Maharashtra**\n- Focus on engineering/CS programs\n- Students can often choose a university near their home city\n\n*All partner universities are government-recognized, so the degree is fully valid.*`,

  "what is the nxtwave assessment test": () =>
    `### 📝 NxtWave Assessment Test (NAT)\n\nThe NAT is NIAT's entrance/scholarship test:\n\n- Tests: Aptitude · Logical Reasoning · Basic Programming\n- Determines your **scholarship level** for the upskilling program\n- Can earn up to **100% scholarship** on NxtWave fees\n- Taken online, multiple attempts possible\n\n*NAT is the gateway to NIAT's upskilling program — it's separate from your university admission.*`,

  "does niat guarantee placements": () =>
    `### 🚀 NIAT Placement Support\n\n**NIAT provides:**\n- **Career support** and placement assistance through NxtWave's network\n- Access to **NxtWave's hiring community** of 2000+ companies\n- Resume prep, mock interviews, referrals\n\n**Note:** NIAT does not make a "100% guarantee" like some other colleges, but their hiring network is strong.\n\n*Best placements go to students who actively complete the upskilling curriculum.*`,

  // Comparisons
  "compare scaler vs nst fees": () =>
    `### 💰 Scaler vs NST — Fee Comparison\n\n| College | Total Fee | Scholarship (max) |\n|---|---|---|\n| **Scaler SST** | ~₹17 Lakh | **100%** (JEE/SAT/NSET) |\n| **NST** | ₹23–24.4 Lakh | **100%** (JEE Excellence) |\n\n**Verdict:** Scaler is ₹6–7 Lakh cheaper, but NST has strong scholarship coverage too. Both can be effectively free for top merit students.`,

  "scaler vs vedam — which is better for cs": () =>
    `### 🎓 Scaler vs Vedam — Which is Better for CS?\n\n| Aspect | Scaler SST | Vedam |\n|---|---|---|\n| Est. | 2019 | 2025 (new) |\n| Fee | ~₹17L | ~₹18L |\n| Location | Bangalore | Gurugram/Pune |\n| Placements | 100% assist, proven | No historical data yet |\n| Mentors | Ex-FAANG professionals | Ex-Google/Microsoft |\n| SAT accepted | Yes | Yes |\n\n**Verdict:** Scaler has a **proven track record**. Vedam is new but has strong mentors. If you want proven placements, choose Scaler. If you're an early adopter, Vedam's curriculum is modern.`,

  "nst vs niat — which has better placements": () =>
    `### 🚀 NST vs NIAT — Placement Comparison\n\n| Aspect | NST | NIAT |\n|---|---|---|\n| Hiring network | 2500+ companies | NxtWave's 2000+ network |\n| Internships | Paid, early in program | Via partner universities |\n| Mentorship | 1:1 with industry pros | NxtWave curriculum track |\n| Brand | Newton School brand | NxtWave brand |\n\n**Verdict:** NST has a slight edge with **1:1 mentorship** and larger hiring network. NIAT is stronger for students who want lower fees while building industry-ready skills.`,

  "which college has the best scholarship": () =>
    `### 🏆 Best Scholarship Comparison — All 4 Colleges\n\n| College | Max Scholarship | Key Type |\n|---|---|---|\n| **Scaler** | 100% | JEE, SAT, NSET merit |\n| **NST** | 100% | JEE Excellence |\n| **Vedam** | 100% | Merit-based (VSAT) |\n| **NIAT** | 100% | NAT-based on upskilling fees |\n\n**All 4 offer up to 100% scholarships!** The difference is in eligibility criteria.\n- Easiest to get: **NIAT** (NAT is accessible)\n- Most competitive: **NST** (JEE 100% scholarship)\n- Most inclusive: **Vedam** (SAT/VSAT/merit, multiple paths)`,

  "which new-gen college is best for girls": () =>
    `### 👩‍💻 Best New-Gen College for Girls\n\n| College | Women-Specific Scholarship | Other Support |\n|---|---|---|\n| **NST** | ✅ Young Women Leader Scholarship | 1:1 mentorship |\n| **Vedam** | ✅ Women in Tech (up to 20%) | Ex-FAANG mentors |\n| **Scaler** | General merit scholarships | Strong placement |\n| **NIAT** | General merit scholarships | Affordable fees |\n\n**Top Picks:**\n- For scholarships: **NST** (dedicated women's scholarship)\n- For career support: **Scaler** (proven placements)\n- For affordability: **NIAT** (lowest fees)\n\n*All 4 actively welcome women in tech!*`,

  "compare all 4 colleges side by side": () =>
    `### 📊 All 4 Colleges — Side by Side\n\n| Feature | Scaler | NST | Vedam | NIAT |\n|---|---|---|---|---|\n| **Fee** | ~₹17L | ₹23–24L | ~₹18L | ₹8–18L |\n| **Max Scholarship** | 100% | 100% | 100% | 100% |\n| **Admission Test** | NSET | NSAT | VSAT | NAT |\n| **SAT Accepted** | ✅ | ✅ | ✅ | — |\n| **Placements** | 100% assist | 2500+ companies | New (2025) | NxtWave network |\n| **Location** | Bangalore | Delhi/Pune/Blr | Gurugram/Pune | 30+ universities |\n| **Est.** | 2019 | 2021 | 2025 | Recent |\n\n**My take:**\n- Best placements: **Scaler**\n- Lowest fees: **NIAT**\n- Best for women: **NST**\n- Most modern curriculum: **Vedam**`,
};

function normalizeQuery(q) {
  return q.toLowerCase().trim()
    .replace(/[?!.,]/g, '')
    .replace(/\s+/g, ' ');
}

function generateSingleCollegeResponse(collegeName, data, intent) {
  if (["fee", "scholarship", "placement"].includes(intent)) {
    const categoryMap = { "fee": "fee", "scholarship": "scholarships", "placement": "placements" };
    const key = categoryMap[intent];
    return `### ${collegeName} — ${intent.charAt(0).toUpperCase() + intent.slice(1)}\n\n${data[key] || 'No data available.'}`;
  }
  if (intent === "admission") {
    return `### ${collegeName} — Admission Process\n\n**Selection Criteria:** ${data["selection criteria"] || "N/A"}\n\n**Highlights:** ${data["highlights"] || "N/A"}`;
  }
  return `### ${collegeName}\n**Location:** ${data["location"] || ""}\n\n**Fee:** ${data["fee"] || ""}\n\n**Scholarships:** ${data["scholarships"] || ""}\n\n**Placements:** ${data["placements"] || ""}\n\n**Selection:** ${data["selection criteria"] || ""}\n\n**Highlights:** ${data["highlights"] || ""}`;
}

function generateComparisonResponse(colleges, dataList) {
  const header = "| Feature | " + colleges.join(" | ") + " |";
  const divider = "|---|" + colleges.map(() => "---").join("|") + "|";
  const features = ["fee", "scholarships", "placements", "selection criteria", "location"];
  const rows = features.map(feature => {
    let row = `| **${feature.charAt(0).toUpperCase() + feature.slice(1)}** | `;
    for (const data of dataList) {
      const val = (data[feature] || "N/A").replace(/\|/g, ",");
      row += `${val} | `;
    }
    return row;
  });
  return [header, divider, ...rows].join("\n") + `\n\n*Comparison of ${colleges.join(', ')}.*`;
}

export function generateChatResponse(query) {
  const normalized = normalizeQuery(query);

  // Check for exact/near-exact match in specific answers
  for (const [key, fn] of Object.entries(SPECIFIC_ANSWERS)) {
    if (normalized === key || normalized.includes(key) || key.includes(normalized)) {
      return { intent: "specific", response: fn() };
    }
  }

  // Fuzzy match — try partial overlap
  const queryWords = new Set(normalized.split(' '));
  let bestKey = null;
  let bestScore = 0;
  for (const key of Object.keys(SPECIFIC_ANSWERS)) {
    const keyWords = key.split(' ');
    const overlap = keyWords.filter(w => queryWords.has(w)).length;
    const score = overlap / keyWords.length;
    if (score > 0.6 && score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }
  if (bestKey) {
    return { intent: "specific", response: SPECIFIC_ANSWERS[bestKey]() };
  }

  // Fall back to intent + college extraction
  const intent = detectIntent(query);
  const colleges = extractColleges(query);
  const retrievedData = colleges.reduce((acc, c) => {
    acc[c] = COLLEGES_DATA[c] || {};
    return acc;
  }, {});

  let responseText = "";

  if (intent === "greeting") {
    responseText = "Hello! I'm EduAssist Neo. I can help you compare Scaler, NST, Vedam, and NIAT — fees, scholarships, placements, and more. How can I help?";
  } else if (intent === "mock_interview") {
    responseText = "Sure! Welcome to Mock Interview mode. I'll ask you a series of questions. Are you ready?";
  } else if (intent === "unknown" && colleges.length === 0) {
    responseText = "I can help with fee, scholarship, placement, or admission details for **Scaler, NST, Vedam, and NIAT**.\n\nTry asking:\n- *\"Compare all 4 colleges side by side\"*\n- *\"Which college has the best scholarship?\"*\n- *\"What is the fee at Scaler?\"*";
  } else if (colleges.length === 1) {
    responseText = generateSingleCollegeResponse(colleges[0], retrievedData[colleges[0]], intent);
  } else if (colleges.length >= 2) {
    responseText = generateComparisonResponse(colleges, Object.values(retrievedData));
  } else if (["fee", "scholarship", "placement"].includes(intent)) {
    responseText = `Which college would you like to know the ${intent} for? Options: **Scaler, NST, Vedam, NIAT**.`;
  } else if (intent === "comparison") {
    responseText = "Which colleges would you like me to compare? E.g., *\"Compare Scaler and Vedam\"* or *\"Compare all 4 colleges side by side\"*.";
  } else {
    responseText = "Please specify a college (Scaler, NST, Vedam, or NIAT) to get started.";
  }

  return { intent, response: responseText };
}
