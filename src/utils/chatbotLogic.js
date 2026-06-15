import COLLEGES_DATA from '../data/colleges.json';

const INTENTS = {
  "comparison": ["compare", "difference between", "which is better", "vs", "versus"],
  "fee": ["fee", "cost", "price", "how much", "tuition", "expenses"],
  "scholarship": ["scholarship", "financial aid", "discount", "waiver", "free"],
  "placement": ["placement", "jobs", "hiring", "salary", "companies", "recruiters", "packages"],
  "greeting": ["hi", "hello", "hey", "good morning", "good evening", "how are you"],
  "mock_interview": ["mock interview", "start interview", "practice interview"]
};

// Simple keyword matching for intent detection
function detectIntent(query) {
  const queryLower = query.toLowerCase();
  
  let bestIntent = "unknown";
  let maxMatches = 0;

  for (const [intent, phrases] of Object.entries(INTENTS)) {
    let matchCount = 0;
    for (const phrase of phrases) {
      if (queryLower.includes(phrase)) {
        matchCount++;
      }
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
    "sst": "Scaler",
    "scaler": "Scaler",
    "nst": "NST",
    "newton": "NST",
    "vedam": "Vedam",
    "vst": "Vedam",
    "niat": "NIAT",
    "nxtwave": "NIAT"
  };

  // Simple tokenization using regex
  const words = queryLower.match(/\b\w+\b/g) || [];
  
  for (const word of words) {
    if (altNames[word] && !detected.includes(altNames[word])) {
      detected.push(altNames[word]);
    }
  }
  
  return detected;
}

function generateSingleCollegeResponse(collegeName, data, intent) {
  if (["fee", "scholarship", "placement"].includes(intent)) {
    const categoryMap = {
      "fee": "fee",
      "scholarship": "scholarships",
      "placement": "placements"
    };
    const key = categoryMap[intent];
    return `### ${collegeName} - ${intent.charAt(0).toUpperCase() + intent.slice(1)}\n\n${data[key] || 'No data available.'}`;
  }

  return `### ${collegeName}
**Location:** ${data["location"] || ""}

**Fee:** ${data["fee"] || ""}

**Scholarships:** ${data["scholarships"] || ""}

**Placements:** ${data["placements"] || ""}

**Selection:** ${data["selection criteria"] || ""}

**Highlights:** ${data["highlights"] || ""}
`;
}

function generateComparisonResponse(colleges, dataList) {
  const header = "| Feature | " + colleges.join(" | ") + " |";
  const divider = "|---|" + colleges.map(() => "---").join("|") + "|";
  
  const features = ["fee", "scholarships", "placements", "selection criteria", "location"];
  const rows = [];
  
  for (const feature of features) {
    let row = `| **${feature.charAt(0).toUpperCase() + feature.slice(1)}** | `;
    for (const data of dataList) {
      const val = (data[feature] || "N/A").replace(/\|/g, ",");
      row += `${val} | `;
    }
    rows.push(row);
  }
  
  const table = [header, divider, ...rows].join("\n");
  const conclusion = `\n\n*Comparison of ${colleges.join(', ')}.*`;
  
  return table + conclusion;
}

export function generateChatResponse(query) {
  const intent = detectIntent(query);
  const colleges = extractColleges(query);
  const retrievedData = colleges.reduce((acc, c) => {
    acc[c] = COLLEGES_DATA[c] || {};
    return acc;
  }, {});

  let responseText = "";

  if (intent === "greeting") {
    responseText = "Hello! I am EduAssist Neo. I can help you compare colleges like Scaler, NST, Vedam, and NIAT, check their fees, placements, or scholarships. How can I assist you today?";
  } else if (intent === "mock_interview") {
    responseText = "Sure! Welcome to Mock Interview mode. I will ask you a series of questions. Are you ready?";
  } else if (intent === "unknown" && colleges.length === 0) {
    responseText = "I'm not quite sure about that. I can help you with fee, scholarship, placement, or admission details for Scaler, NST, Vedam, and NIAT. Try asking 'Compare Scaler and NST'.";
  } else if (colleges.length === 1) {
    responseText = generateSingleCollegeResponse(colleges[0], retrievedData[colleges[0]], intent);
  } else if (colleges.length >= 2) {
    responseText = generateComparisonResponse(colleges, Object.values(retrievedData));
  } else if (["fee", "scholarship", "placement"].includes(intent)) {
    responseText = `Which college would you like to know the ${intent} for? Options are: Scaler, NST, Vedam, NIAT.`;
  } else if (intent === "comparison") {
    responseText = "Which colleges would you like me to compare? You can say, for example, 'Compare Scaler and Vedam'.";
  } else {
    responseText = "Please specify a college (Scaler, NST, Vedam, or NIAT) to get started.";
  }

  return { intent, response: responseText };
}
