export const downloadPDF = (content: string, filename: string) => {
  // Create a simple text-based report since we don't have PDF libraries
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateCreditReport = (creditScore: any, farmerName: string) => {
  const timestamp = new Date().toLocaleString();
  
  return `
AGRICREDIT SCORE REPORT
========================

Farmer Name: ${farmerName}
Generated On: ${timestamp}
Report ID: AGR-${Date.now()}

CREDIT SCORE SUMMARY
====================
Score: ${creditScore.score}/100
Risk Level: ${creditScore.riskLevel.toUpperCase()}

KEY FACTORS
===========
${creditScore.factors.map((factor: any, index: number) => 
  `${index + 1}. ${factor.name}: ${factor.impact > 0 ? '+' : ''}${factor.impact} points
     Value: ${factor.value}`
).join('\n')}

EXPLANATION
===========
${creditScore.explanation.map((point: string, index: number) => 
  `${index + 1}. ${point}`
).join('\n')}

RECOMMENDATIONS
===============
${creditScore.recommendations.map((rec: string, index: number) => 
  `${index + 1}. ${rec}`
).join('\n')}

NEXT STEPS
==========
1. Visit your nearest bank with required documents
2. Present this report along with your application
3. Follow up on improvement suggestions if risk level is medium/high
4. Reapply after implementing recommendations if needed

DISCLAIMER
==========
This score is for guidance purposes only. Final loan approval decisions rest with the lending institution.
This report is generated by AgriCredit Score AI system for demonstration purposes.

Contact: support@agricreditscore.com
Website: https://agricreditscore.com
`;
};

export const generateImprovementPlan = (creditScore: any, farmerName: string, language: string) => {
  const timestamp = new Date().toLocaleString();
  
  const content = {
    en: {
      title: "FARMING IMPROVEMENT PLAN",
      sections: {
        yieldImprovement: "YIELD IMPROVEMENT STRATEGIES",
        riskManagement: "RISK MANAGEMENT & RESILIENCE", 
        technology: "TECHNOLOGY ADOPTION"
      }
    },
    hi: {
      title: "कृषि सुधार योजना",
      sections: {
        yieldImprovement: "उत्पादन वृद्धि रणनीतियाँ",
        riskManagement: "जोखिम प्रबंधन और लचीलापन",
        technology: "प्रौद्योगिकी अपनाना"
      }
    },
    mr: {
      title: "शेतकी सुधारणा योजना",
      sections: {
        yieldImprovement: "उत्पादन वाढीच्या रणनीती",
        riskManagement: "जोखीम व्यवस्थापन आणि लवचिकता",
        technology: "तंत्रज्ञान अवलंब"
      }
    }
  };

  const lang = content[language as keyof typeof content] || content.en;

  return `
${lang.title}
${'='.repeat(lang.title.length)}

Farmer Name: ${farmerName}
Generated On: ${timestamp}
Current Credit Score: ${creditScore.score}/100
Risk Level: ${creditScore.riskLevel.toUpperCase()}

${lang.sections.yieldImprovement}
${'='.repeat(lang.sections.yieldImprovement.length)}
1. Use High-Yield Variety Seeds
   - Switch to certified hybrid seeds
   - Expected impact: 20-30% yield increase
   - Timeline: Next season

2. Soil Testing & Fertilization
   - Get soil tested every 2 years
   - Use balanced NPK fertilizers
   - Timeline: Immediate

3. Precision Farming Techniques
   - GPS-guided equipment
   - Variable rate application
   - Timeline: 1-2 years

${lang.sections.riskManagement}
${'='.repeat(lang.sections.riskManagement.length)}
1. Weather-Resistant Varieties
   - Plant drought-tolerant crops
   - Flood-resistant varieties
   - Timeline: Next season

2. Crop Insurance
   - Enroll in PM Fasal Bima Yojana
   - Weather risk protection
   - Timeline: Immediate

3. Water Conservation
   - Install drip irrigation
   - Sprinkler systems
   - Timeline: 6 months

${lang.sections.technology}
${'='.repeat(lang.sections.technology.length)}
1. Mobile Apps for Farming
   - Kisan Suvidha app
   - Weather and market updates
   - Timeline: Immediate

2. IoT Sensors
   - Soil moisture monitoring
   - Weather stations
   - Timeline: 1 year

GOVERNMENT SCHEMES TO APPLY
===========================
1. PM-KISAN: ₹6,000 annual support
2. Pradhan Mantri Fasal Bima Yojana: Crop insurance
3. Kisan Credit Card: Credit facility at 7% interest
4. Soil Health Card: Free soil testing

CONTACT INFORMATION
===================
Agricultural Officer: contact-agri@gov.in
Helpline: 1800-XXX-XXXX
Website: https://agricreditscore.com

Generated by AgriCredit Score AI System
`;
};

export const saveToLocalStorage = (data: any, key: string) => {
  const timestamp = new Date().toISOString();
  const savedData = {
    ...data,
    savedAt: timestamp,
    id: `AGR_${Date.now()}`
  };
  localStorage.setItem(key, JSON.stringify(savedData));
  return savedData.id;
};

export const loadFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};