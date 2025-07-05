import React, { useState } from 'react';
import { ArrowLeft, Sprout, TrendingUp, Award, ExternalLink, ChevronDown, ChevronUp, Info, Download, Mail, Bell } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { CreditScore } from '../types';
import { downloadPDF, generateImprovementPlan } from '../utils/downloadUtils';

interface FarmingImprovementsProps {
  creditScore: CreditScore;
  onBack: () => void;
  farmerName?: string;
}

const FarmingImprovements: React.FC<FarmingImprovementsProps> = ({ 
  creditScore, 
  onBack,
  farmerName = "Farmer"
}) => {
  const { t, language } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<string | null>('improvements');

  const handleDownloadPlan = () => {
    const plan = generateImprovementPlan(creditScore, farmerName, language);
    downloadPDF(plan, `Improvement_Plan_${farmerName}`);
  };

  const handleContactOfficer = () => {
    const subject = `Agricultural Guidance Request - ${farmerName}`;
    const body = `Dear Agricultural Officer,

I am ${farmerName} and I need guidance on improving my farming practices.

My current AgriCredit Score: ${creditScore.score}/100
Risk Level: ${creditScore.riskLevel.toUpperCase()}

I would like assistance with:
- Yield improvement strategies
- Risk management techniques
- Government scheme applications
- Technology adoption

Please contact me at your earliest convenience.

Best regards,
${farmerName}`;

    window.open(`mailto:agri-officer@gov.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleSetReminders = () => {
    // Check if browser supports notifications
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // Set up reminders for key farming activities
          const reminders = [
            { message: 'Time to check soil health and apply fertilizers', delay: 7 * 24 * 60 * 60 * 1000 }, // 7 days
            { message: 'Review crop insurance and government schemes', delay: 30 * 24 * 60 * 60 * 1000 }, // 30 days
            { message: 'Update your AgriCredit assessment', delay: 90 * 24 * 60 * 60 * 1000 } // 90 days
          ];

          reminders.forEach((reminder) => {
            setTimeout(() => {
              new Notification('AgriCredit Reminder', {
                body: reminder.message,
                icon: '/favicon.ico'
              });
            }, reminder.delay);
          });

          alert(`Reminders set successfully! You'll receive notifications for:
• Soil health check (7 days)
• Insurance review (30 days) 
• Assessment update (90 days)`);
        } else {
          // Fallback to localStorage reminders
          const reminders = {
            soilCheck: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            insuranceReview: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            assessmentUpdate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
          };
          localStorage.setItem('agricredit_reminders', JSON.stringify(reminders));
          alert('Reminders saved! Check back regularly for updates.');
        }
      });
    } else {
      alert('Browser notifications not supported. Please set manual reminders.');
    }
  };

  const getImprovementRecommendations = () => {
    const recommendations = {
      en: {
        title: "Farming Improvement Recommendations",
        subtitle: "Based on your risk assessment, here are specific ways to improve your farming and increase your credit score:",
        sections: {
          yieldImprovement: {
            title: "Yield Improvement Strategies",
            icon: TrendingUp,
            items: [
              {
                title: "Use High-Yield Variety Seeds",
                description: "Switch to certified hybrid or HYV seeds that can increase yield by 20-30%",
                impact: "High Impact",
                timeframe: "Next Season"
              },
              {
                title: "Soil Testing & Fertilization",
                description: "Get soil tested every 2 years and use balanced NPK fertilizers based on results",
                impact: "High Impact", 
                timeframe: "Immediate"
              },
              {
                title: "Precision Farming Techniques",
                description: "Use GPS-guided equipment and variable rate application for optimal resource use",
                impact: "Medium Impact",
                timeframe: "1-2 Years"
              },
              {
                title: "Crop Rotation & Intercropping",
                description: "Rotate crops to maintain soil health and practice intercropping for additional income",
                impact: "Medium Impact",
                timeframe: "Next Season"
              }
            ]
          },
          riskManagement: {
            title: "Risk Management & Resilience",
            icon: Award,
            items: [
              {
                title: "Weather-Resistant Varieties",
                description: "Plant drought-tolerant and flood-resistant crop varieties",
                impact: "High Impact",
                timeframe: "Next Season"
              },
              {
                title: "Crop Insurance",
                description: "Enroll in Pradhan Mantri Fasal Bima Yojana for weather risk protection",
                impact: "High Impact",
                timeframe: "Immediate"
              },
              {
                title: "Water Conservation",
                description: "Install drip irrigation or sprinkler systems to reduce water dependency",
                impact: "High Impact",
                timeframe: "6 Months"
              },
              {
                title: "Diversified Farming",
                description: "Add livestock, poultry, or fish farming to reduce crop-only dependency",
                impact: "Medium Impact",
                timeframe: "1 Year"
              }
            ]
          },
          technology: {
            title: "Technology Adoption",
            icon: Sprout,
            items: [
              {
                title: "Mobile Apps for Farming",
                description: "Use apps like Kisan Suvidha, mKisan for weather, market prices, and expert advice",
                impact: "Low Impact",
                timeframe: "Immediate"
              },
              {
                title: "IoT Sensors",
                description: "Install soil moisture and weather monitoring sensors for data-driven decisions",
                impact: "Medium Impact",
                timeframe: "1 Year"
              },
              {
                title: "Mechanization",
                description: "Use tractors, harvesters, and other machinery to reduce labor costs and improve efficiency",
                impact: "High Impact",
                timeframe: "2-3 Years"
              }
            ]
          }
        }
      },
      hi: {
        title: "कृषि सुधार की सिफारिशें",
        subtitle: "आपके जोखिम मूल्यांकन के आधार पर, यहाँ आपकी कृषि में सुधार और क्रेडिट स्कोर बढ़ाने के विशिष्ट तरीके हैं:",
        sections: {
          yieldImprovement: {
            title: "उत्पादन वृद्धि रणनीतियाँ",
            icon: TrendingUp,
            items: [
              {
                title: "उच्च उत्पादन किस्म के बीज",
                description: "प्रमाणित संकर या HYV बीजों का उपयोग करें जो उत्पादन 20-30% बढ़ा सकते हैं",
                impact: "उच्च प्रभाव",
                timeframe: "अगला सीजन"
              },
              {
                title: "मिट्टी परीक्षण और उर्वरीकरण",
                description: "हर 2 साल में मिट्टी की जांच कराएं और परिणामों के आधार पर संतुलित NPK उर्वरक का उपयोग करें",
                impact: "उच्च प्रभाव",
                timeframe: "तुरंत"
              },
              {
                title: "सटीक कृषि तकनीक",
                description: "GPS-गाइडेड उपकरण और परिवर्तनीय दर अनुप्रयोग का उपयोग करें",
                impact: "मध्यम प्रभाव",
                timeframe: "1-2 साल"
              },
              {
                title: "फसल चक्र और मिश्रित खेती",
                description: "मिट्टी की सेहत बनाए रखने के लिए फसल चक्र अपनाएं और अतिरिक्त आय के लिए मिश्रित खेती करें",
                impact: "मध्यम प्रभाव",
                timeframe: "अगला सीजन"
              }
            ]
          },
          riskManagement: {
            title: "जोखिम प्रबंधन और लचीलापन",
            icon: Award,
            items: [
              {
                title: "मौसम प्रतिरोधी किस्में",
                description: "सूखा सहनशील और बाढ़ प्रतिरोधी फसल किस्में लगाएं",
                impact: "उच्च प्रभाव",
                timeframe: "अगला सीजन"
              },
              {
                title: "फसल बीमा",
                description: "मौसम जोखिम सुरक्षा के लिए प्रधानमंत्री फसल बीमा योजना में नामांकन करें",
                impact: "उच्च प्रभाव",
                timeframe: "तुरंत"
              },
              {
                title: "जल संरक्षण",
                description: "पानी की निर्भरता कम करने के लिए ड्रिप सिंचाई या स्प्रिंकलर सिस्टम लगाएं",
                impact: "उच्च प्रभाव",
                timeframe: "6 महीने"
              },
              {
                title: "विविधीकृत कृषि",
                description: "केवल फसल पर निर्भरता कम करने के लिए पशुपालन, मुर्गीपालन या मछली पालन जोड़ें",
                impact: "मध्यम प्रभाव",
                timeframe: "1 साल"
              }
            ]
          },
          technology: {
            title: "प्रौद्योगिकी अपनाना",
            icon: Sprout,
            items: [
              {
                title: "कृषि के लिए मोबाइल ऐप्स",
                description: "मौसम, बाजार भाव और विशेषज्ञ सलाह के लिए किसान सुविधा, mKisan जैसे ऐप्स का उपयोग करें",
                impact: "कम प्रभाव",
                timeframe: "तुरंत"
              },
              {
                title: "IoT सेंसर",
                description: "डेटा-आधारित निर्णयों के लिए मिट्टी की नमी और मौसम निगरानी सेंसर लगाएं",
                impact: "मध्यम प्रभाव",
                timeframe: "1 साल"
              },
              {
                title: "यंत्रीकरण",
                description: "श्रम लागत कम करने और दक्षता बढ़ाने के लिए ट्रैक्टर, हार्वेस्टर और अन्य मशीनों का उपयोग करें",
                impact: "उच्च प्रभाव",
                timeframe: "2-3 साल"
              }
            ]
          }
        }
      },
      mr: {
        title: "शेतकी सुधारणेच्या शिफारशी",
        subtitle: "तुमच्या जोखीम मूल्यांकनाच्या आधारे, तुमची शेती सुधारण्यासाठी आणि क्रेडिट स्कोअर वाढवण्यासाठी येथे विशिष्ट मार्ग आहेत:",
        sections: {
          yieldImprovement: {
            title: "उत्पादन वाढीच्या रणनीती",
            icon: TrendingUp,
            items: [
              {
                title: "उच्च उत्पादन जातीचे बियाणे",
                description: "प्रमाणित संकरित किंवा HYV बियाण्यांचा वापर करा जे उत्पादन 20-30% वाढवू शकतात",
                impact: "उच्च प्रभाव",
                timeframe: "पुढचा हंगाम"
              },
              {
                title: "माती चाचणी आणि खतीकरण",
                description: "दर 2 वर्षांनी माती चाचणी करा आणि परिणामांच्या आधारे संतुलित NPK खतांचा वापर करा",
                impact: "उच्च प्रभाव",
                timeframe: "तात्काळ"
              },
              {
                title: "अचूक शेती तंत्र",
                description: "इष्टतम संसाधन वापरासाठी GPS-मार्गदर्शित उपकरणे आणि परिवर्तनीय दर अनुप्रयोग वापरा",
                impact: "मध्यम प्रभाव",
                timeframe: "1-2 वर्षे"
              },
              {
                title: "पीक फेरफार आणि मिश्र पीक",
                description: "मातीचे आरोग्य राखण्यासाठी पीक फेरफार करा आणि अतिरिक्त उत्पन्नासाठी मिश्र पीक करा",
                impact: "मध्यम प्रभाव",
                timeframe: "पुढचा हंगाम"
              }
            ]
          },
          riskManagement: {
            title: "जोखीम व्यवस्थापन आणि लवचिकता",
            icon: Award,
            items: [
              {
                title: "हवामान प्रतिरोधी जाती",
                description: "दुष्काळ सहनशील आणि पूर प्रतिरोधी पीक जाती लावा",
                impact: "उच्च प्रभाव",
                timeframe: "पुढचा हंगाम"
              },
              {
                title: "पीक विमा",
                description: "हवामान जोखीम संरक्षणासाठी प्रधानमंत्री फसल बीमा योजनेत नोंदणी करा",
                impact: "उच्च प्रभाव",
                timeframe: "तात्काळ"
              },
              {
                title: "जल संधारण",
                description: "पाण्याची अवलंबित्व कमी करण्यासाठी ठिबक सिंचन किंवा फवारणी यंत्रणा बसवा",
                impact: "उच्च प्रभाव",
                timeframe: "6 महिने"
              },
              {
                title: "विविधीकृत शेती",
                description: "केवळ पिकावरील अवलंबित्व कमी करण्यासाठी पशुपालन, कुक्कुटपालन किंवा मत्स्यपालन जोडा",
                impact: "मध्यम प्रभाव",
                timeframe: "1 वर्ष"
              }
            ]
          },
          technology: {
            title: "तंत्रज्ञान अवलंब",
            icon: Sprout,
            items: [
              {
                title: "शेतीसाठी मोबाइल अॅप्स",
                description: "हवामान, बाजार भाव आणि तज्ञ सल्ल्यासाठी किसान सुविधा, mKisan सारखे अॅप्स वापरा",
                impact: "कमी प्रभाव",
                timeframe: "तात्काळ"
              },
              {
                title: "IoT सेन्सर",
                description: "डेटा-आधारित निर्णयांसाठी माती ओलावा आणि हवामान निरीक्षण सेन्सर बसवा",
                impact: "मध्यम प्रभाव",
                timeframe: "1 वर्ष"
              },
              {
                title: "यंत्रीकरण",
                description: "श्रम खर्च कमी करण्यासाठी आणि कार्यक्षमता वाढवण्यासाठी ट्रॅक्टर, कापणी यंत्रे आणि इतर यंत्रांचा वापर करा",
                impact: "उच्च प्रभाव",
                timeframe: "2-3 वर्षे"
              }
            ]
          }
        }
      }
    };
    return recommendations[language as keyof typeof recommendations] || recommendations.en;
  };

  const getGovernmentSchemes = () => {
    const schemes = {
      en: {
        title: "Government Schemes for Farmers",
        subtitle: "Take advantage of these government schemes to improve your farming and financial situation:",
        schemes: [
          {
            name: "PM-KISAN",
            description: "₹6,000 per year direct income support to farmer families",
            eligibility: "All landholding farmer families",
            benefits: "₹2,000 every 4 months",
            howToApply: "Apply online at pmkisan.gov.in or visit nearest CSC",
            link: "https://pmkisan.gov.in"
          },
          {
            name: "Pradhan Mantri Fasal Bima Yojana",
            description: "Crop insurance scheme providing financial support against crop loss",
            eligibility: "All farmers growing notified crops",
            benefits: "Up to ₹2 lakh coverage per farmer per season",
            howToApply: "Apply through banks, CSCs, or insurance companies",
            link: "https://pmfby.gov.in"
          },
          {
            name: "Kisan Credit Card (KCC)",
            description: "Credit facility for farmers to meet agricultural expenses",
            eligibility: "All farmers including tenant farmers",
            benefits: "Credit up to ₹3 lakh at 7% interest rate",
            howToApply: "Apply at any bank branch with land documents",
            link: "https://www.nabard.org"
          },
          {
            name: "PM Kisan Maandhan Yojana",
            description: "Pension scheme for small and marginal farmers",
            eligibility: "Farmers aged 18-40 with up to 2 hectares land",
            benefits: "₹3,000 monthly pension after 60 years",
            howToApply: "Apply online or through CSCs",
            link: "https://maandhan.in"
          },
          {
            name: "Soil Health Card Scheme",
            description: "Free soil testing and nutrient recommendations",
            eligibility: "All farmers",
            benefits: "Free soil testing every 2 years",
            howToApply: "Contact local agriculture department",
            link: "https://soilhealth.dac.gov.in"
          },
          {
            name: "National Agriculture Market (e-NAM)",
            description: "Online trading platform for agricultural commodities",
            eligibility: "All farmers",
            benefits: "Better price discovery and reduced transaction costs",
            howToApply: "Register at enam.gov.in",
            link: "https://enam.gov.in"
          }
        ]
      },
      hi: {
        title: "किसानों के लिए सरकारी योजनाएं",
        subtitle: "अपनी कृषि और वित्तीय स्थिति सुधारने के लिए इन सरकारी योजनाओं का लाभ उठाएं:",
        schemes: [
          {
            name: "पीएम-किसान",
            description: "किसान परिवारों को प्रति वर्ष ₹6,000 प्रत्यक्ष आय सहायता",
            eligibility: "सभी भूमिधारक किसान परिवार",
            benefits: "हर 4 महीने में ₹2,000",
            howToApply: "pmkisan.gov.in पर ऑनलाइन आवेदन करें या निकटतम CSC पर जाएं",
            link: "https://pmkisan.gov.in"
          },
          {
            name: "प्रधानमंत्री फसल बीमा योजना",
            description: "फसल नुकसान के खिलाफ वित्तीय सहायता प्रदान करने वाली फसल बीमा योजना",
            eligibility: "अधिसूचित फसलें उगाने वाले सभी किसान",
            benefits: "प्रति किसान प्रति सीजन ₹2 लाख तक का कवरेज",
            howToApply: "बैंकों, CSCs, या बीमा कंपनियों के माध्यम से आवेदन करें",
            link: "https://pmfby.gov.in"
          },
          {
            name: "किसान क्रेडिट कार्ड (KCC)",
            description: "कृषि खर्चों को पूरा करने के लिए किसानों के लिए ऋण सुविधा",
            eligibility: "किरायेदार किसानों सहित सभी किसान",
            benefits: "7% ब्याज दर पर ₹3 लाख तक का ऋण",
            howToApply: "भूमि दस्तावेजों के साथ किसी भी बैंक शाखा में आवेदन करें",
            link: "https://www.nabard.org"
          },
          {
            name: "पीएम किसान मानधन योजना",
            description: "छोटे और सीमांत किसानों के लिए पेंशन योजना",
            eligibility: "18-40 वर्ष की आयु के 2 हेक्टेयर तक भूमि वाले किसान",
            benefits: "60 वर्ष बाद ₹3,000 मासिक पेंशन",
            howToApply: "ऑनलाइन या CSCs के माध्यम से आवेदन करें",
            link: "https://maandhan.in"
          },
          {
            name: "मृदा स्वास्थ्य कार्ड योजना",
            description: "मुफ्त मिट्टी परीक्षण और पोषक तत्व सिफारिशें",
            eligibility: "सभी किसान",
            benefits: "हर 2 साल में मुफ्त मिट्टी परीक्षण",
            howToApply: "स्थानीय कृषि विभाग से संपर्क करें",
            link: "https://soilhealth.dac.gov.in"
          },
          {
            name: "राष्ट्रीय कृषि बाजार (e-NAM)",
            description: "कृषि वस्तुओं के लिए ऑनलाइन व्यापार मंच",
            eligibility: "सभी किसान",
            benefits: "बेहतर मूल्य खोज और कम लेनदेन लागत",
            howToApply: "enam.gov.in पर पंजीकरण करें",
            link: "https://enam.gov.in"
          }
        ]
      },
      mr: {
        title: "शेतकर्‍यांसाठी सरकारी योजना",
        subtitle: "तुमची शेती आणि आर्थिक परिस्थिती सुधारण्यासाठी या सरकारी योजनांचा फायदा घ्या:",
        schemes: [
          {
            name: "पीएम-किसान",
            description: "शेतकरी कुटुंबांना दरवर्षी ₹6,000 प्रत्यक्ष उत्पन्न सहाय्य",
            eligibility: "सर्व भूमिधारक शेतकरी कुटुंबे",
            benefits: "दर 4 महिन्यांत ₹2,000",
            howToApply: "pmkisan.gov.in वर ऑनलाइन अर्ज करा किंवा जवळच्या CSC ला भेट द्या",
            link: "https://pmkisan.gov.in"
          },
          {
            name: "प्रधानमंत्री फसल बीमा योजना",
            description: "पीक नुकसानीविरुद्ध आर्थिक सहाय्य देणारी पीक विमा योजना",
            eligibility: "अधिसूचित पिके घेणारे सर्व शेतकरी",
            benefits: "प्रति शेतकरी प्रति हंगाम ₹2 लाख पर्यंत कव्हरेज",
            howToApply: "बँका, CSCs, किंवा विमा कंपन्यांमार्फत अर्ज करा",
            link: "https://pmfby.gov.in"
          },
          {
            name: "किसान क्रेडिट कार्ड (KCC)",
            description: "कृषी खर्च भागवण्यासाठी शेतकर्‍यांसाठी कर्ज सुविधा",
            eligibility: "भाडेकरू शेतकर्‍यांसह सर्व शेतकरी",
            benefits: "7% व्याज दराने ₹3 लाख पर्यंत कर्ज",
            howToApply: "जमीन कागदपत्रांसह कोणत्याही बँक शाखेत अर्ज करा",
            link: "https://www.nabard.org"
          },
          {
            name: "पीएम किसान मानधन योजना",
            description: "लहान आणि सीमांत शेतकर्‍यांसाठी पेन्शन योजना",
            eligibility: "18-40 वयोगटातील 2 हेक्टर पर्यंत जमीन असलेले शेतकरी",
            benefits: "60 वर्षानंतर ₹3,000 मासिक पेन्शन",
            howToApply: "ऑनलाइन किंवा CSCs मार्फत अर्ज करा",
            link: "https://maandhan.in"
          },
          {
            name: "माती आरोग्य कार्ड योजना",
            description: "मोफत माती चाचणी आणि पोषक तत्व शिफारशी",
            eligibility: "सर्व शेतकरी",
            benefits: "दर 2 वर्षांनी मोफत माती चाचणी",
            howToApply: "स्थानिक कृषी विभागाशी संपर्क साधा",
            link: "https://soilhealth.dac.gov.in"
          },
          {
            name: "राष्ट्रीय कृषी बाजार (e-NAM)",
            description: "कृषी वस्तूंसाठी ऑनलाइन व्यापार व्यासपीठ",
            eligibility: "सर्व शेतकरी",
            benefits: "चांगली किंमत शोध आणि कमी व्यवहार खर्च",
            howToApply: "enam.gov.in वर नोंदणी करा",
            link: "https://enam.gov.in"
          }
        ]
      }
    };
    return schemes[language as keyof typeof schemes] || schemes.en;
  };

  const recommendations = getImprovementRecommendations();
  const schemes = getGovernmentSchemes();

  const getImpactColor = (impact: string) => {
    const impactMap = {
      'High Impact': 'bg-green-100 text-green-800',
      'Medium Impact': 'bg-yellow-100 text-yellow-800', 
      'Low Impact': 'bg-blue-100 text-blue-800',
      'उच्च प्रभाव': 'bg-green-100 text-green-800',
      'मध्यम प्रभाव': 'bg-yellow-100 text-yellow-800',
      'कम प्रभाव': 'bg-blue-100 text-blue-800'
    };
    return impactMap[impact as keyof typeof impactMap] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t('backToHome')}</span>
            </button>
            <h2 className="text-2xl font-bold text-gray-900">{recommendations.title}</h2>
            <p className="text-gray-600 mt-2">{recommendations.subtitle}</p>
          </div>

          <div className="p-6">
            {/* Risk Assessment Notice */}
            {creditScore.riskLevel === 'high' && (
              <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-red-800">
                    {language === 'en' ? 'High Risk Assessment' : 
                     language === 'hi' ? 'उच्च जोखिम मूल्यांकन' : 
                     'उच्च जोखीम मूल्यांकन'}
                  </h3>
                </div>
                <p className="text-red-700 text-sm">
                  {language === 'en' ? 'Your current risk level is high. Please focus on the improvement suggestions below and discuss further with your bank before applying for loans.' :
                   language === 'hi' ? 'आपका वर्तमान जोखिम स्तर उच्च है। कृपया नीचे दिए गए सुधार सुझावों पर ध्यान दें और ऋण के लिए आवेदन करने से पहले अपने बैंक से आगे चर्चा करें।' :
                   'तुमची सध्याची जोखीम पातळी उच्च आहे. कृपया खालील सुधारणा सूचनांवर लक्ष द्या आणि कर्जासाठी अर्ज करण्यापूर्वी तुमच्या बँकेशी पुढे चर्चा करा.'}
                </p>
              </div>
            )}

            {/* Improvement Recommendations */}
            <div className="space-y-6">
              {Object.entries(recommendations.sections).map(([key, section]) => {
                const Icon = section.icon;
                const isExpanded = expandedSection === key;
                
                return (
                  <div key={key} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedSection(isExpanded ? null : key)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-6 h-6 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          {section.title}
                        </h3>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="grid gap-4 md:grid-cols-2">
                          {section.items.map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900">{item.title}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
                                  {item.impact}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                              <div className="text-xs text-blue-600 font-medium">
                                {language === 'en' ? 'Timeline: ' : 
                                 language === 'hi' ? 'समयसीमा: ' : 
                                 'कालमर्यादा: '}{item.timeframe}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Government Schemes Section */}
            <div className="mt-12">
              <div className="border border-blue-200 rounded-lg">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'schemes' ? null : 'schemes')}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {schemes.title}
                    </h3>
                  </div>
                  {expandedSection === 'schemes' ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {expandedSection === 'schemes' && (
                  <div className="p-4 border-t border-blue-200 bg-blue-50">
                    <p className="text-blue-700 mb-6">{schemes.subtitle}</p>
                    <div className="grid gap-6 md:grid-cols-2">
                      {schemes.schemes.map((scheme, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-blue-100">
                          <h4 className="font-semibold text-blue-900 mb-2">{scheme.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{scheme.description}</p>
                          
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">
                                {language === 'en' ? 'Eligibility: ' : 
                                 language === 'hi' ? 'पात्रता: ' : 
                                 'पात्रता: '}
                              </span>
                              <span className="text-gray-600">{scheme.eligibility}</span>
                            </div>
                            
                            <div>
                              <span className="font-medium text-gray-700">
                                {language === 'en' ? 'Benefits: ' : 
                                 language === 'hi' ? 'लाभ: ' : 
                                 'फायदे: '}
                              </span>
                              <span className="text-green-600 font-medium">{scheme.benefits}</span>
                            </div>
                            
                            <div>
                              <span className="font-medium text-gray-700">
                                {language === 'en' ? 'How to Apply: ' : 
                                 language === 'hi' ? 'आवेदन कैसे करें: ' : 
                                 'अर्ज कसा करावा: '}
                              </span>
                              <span className="text-gray-600">{scheme.howToApply}</span>
                            </div>
                          </div>
                          
                          <a
                            href={scheme.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1 transition-colors"
                          >
                            <span>
                              {language === 'en' ? 'Learn More' : 
                               language === 'hi' ? 'और जानें' : 
                               'अधिक जाणून घ्या'}
                            </span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <button 
                onClick={handleDownloadPlan}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-center font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>
                  {language === 'en' ? 'Download Improvement Plan' : 
                   language === 'hi' ? 'सुधार योजना डाउनलोड करें' : 
                   'सुधारणा योजना डाउनलोड करा'}
                </span>
              </button>
              <button 
                onClick={handleContactOfficer}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>
                  {language === 'en' ? 'Contact Agricultural Officer' : 
                   language === 'hi' ? 'कृषि अधिकारी से संपर्क करें' : 
                   'कृषी अधिकार्‍याशी संपर्क साधा'}
                </span>
              </button>
              <button 
                onClick={handleSetReminders}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg text-center font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>
                  {language === 'en' ? 'Set Reminders' : 
                   language === 'hi' ? 'रिमाइंडर सेट करें' : 
                   'स्मरणपत्र सेट करा'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmingImprovements;