import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle, AlertCircle, Info, ChevronRight, User, FileText, Shield, BarChart3, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HowToUseProps {
  onBack: () => void;
}

const HowToUse: React.FC<HowToUseProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const getContent = () => {
    const content = {
      en: {
        title: "How to Use KrishiSahay",
        subtitle: "Complete guide to get your agricultural credit assessment",
        steps: [
          {
            title: "Create Account & Login",
            description: "Start your credit assessment journey",
            icon: User,
            details: [
              "Visit the KrishiSahay website",
              "Click 'Create Account' if you're a new user",
              "Fill in your name, email, phone number, and create a password",
              "Complete human verification (CAPTCHA)",
              "Login with your credentials"
            ],
            tips: [
              "Use a valid email address and phone number",
              "Choose a strong password for security",
              "Remember your login credentials for future use"
            ]
          },
          {
            title: "Choose Land Type",
            description: "Select your land ownership status",
            icon: FileText,
            details: [
              "After login, you'll see two options:",
              "Option 1: 'I Own Land (7/12 Document)' - if you have legal ownership",
              "Option 2: 'I Lease Land' - if you farm on leased land",
              "Select the appropriate option based on your situation"
            ],
            tips: [
              "Land ownership provides better loan terms",
              "Lease land requires additional documentation",
              "Choose honestly as this affects your assessment"
            ]
          },
          {
            title: "Document Upload (For Land Owners)",
            description: "Upload and verify your 7/12 document",
            icon: Shield,
            details: [
              "Upload your 7/12 land ownership document (JPG, PNG, or PDF)",
              "System will extract information using OCR technology",
              "Verify that extracted details match your records",
              "Confirm name matching with your login credentials"
            ],
            tips: [
              "Ensure document is clear and readable",
              "File size should be under 5MB",
              "Name on document must match your login name"
            ]
          },
          {
            title: "Complete Assessment Form",
            description: "Fill detailed information about your farming",
            icon: BarChart3,
            details: [
              "Personal Information: Name verification, age, experience",
              "Aadhaar Verification: Enter 12-digit number and verify with OTP",
              "Farming Data: Crops, yield, irrigation, soil health",
              "Financial Information: Income, expenses, loan requirements",
              "Community Data: Cooperative membership, training programs"
            ],
            tips: [
              "Be honest and accurate with all information",
              "For demo: Use OTP 123456 for Aadhaar verification",
              "Include all sources of agricultural income",
              "Mention any government schemes you're enrolled in"
            ]
          },
          {
            title: "Get Your Credit Score",
            description: "Review your assessment results",
            icon: Download,
            details: [
              "Receive your credit score out of 100",
              "Understand your risk level (Low/Medium/High)",
              "Review factors that influenced your score",
              "Get personalized recommendations for improvement",
              "See loan eligibility and repayment estimates"
            ],
            tips: [
              "Download your report for bank visits",
              "Focus on high-impact improvement areas",
              "Save assessment for future reference",
              "Share results with potential lenders"
            ]
          }
        ],
        flowSteps: {
          title: "Complete Assessment Flow",
          steps: [
            "Login/Register → Choose Language",
            "Select Land Type (Owned/Lease)",
            "Upload Documents (if land owner)",
            "Complete Assessment Form",
            "Aadhaar + OTP Verification",
            "Get Credit Score & Recommendations",
            "Download Report & Next Steps"
          ]
        },
        importantNotes: {
          title: "Important Notes",
          notes: [
            "This is a demonstration system for educational purposes",
            "Real implementation would require government API integration",
            "All data is stored locally for demo purposes",
            "Use demo OTP 123456 for Aadhaar verification",
            "Credit scores are calculated using AI algorithms",
            "Results are for guidance only - banks make final decisions"
          ]
        }
      },
      hi: {
        title: "कृषि सहाय का उपयोग कैसे करें",
        subtitle: "अपना कृषि क्रेडिट मूल्यांकन प्राप्त करने के लिए पूर्ण गाइड",
        steps: [
          {
            title: "खाता बनाएं और लॉगिन करें",
            description: "अपनी क्रेडिट मूल्यांकन यात्रा शुरू करें",
            icon: User,
            details: [
              "कृषि सहाय वेबसाइट पर जाएं",
              "यदि आप नए उपयोगकर्ता हैं तो 'खाता बनाएं' पर क्लिक करें",
              "अपना नाम, ईमेल, फोन नंबर भरें और पासवर्ड बनाएं",
              "मानव सत्यापन (CAPTCHA) पूरा करें",
              "अपनी साख के साथ लॉगिन करें"
            ],
            tips: [
              "एक वैध ईमेल पता और फोन नंबर का उपयोग करें",
              "सुरक्षा के लिए एक मजबूत पासवर्ड चुनें",
              "भविष्य के उपयोग के लिए अपनी लॉगिन साख याद रखें"
            ]
          },
          {
            title: "भूमि प्रकार चुनें",
            description: "अपनी भूमि स्वामित्व स्थिति चुनें",
            icon: FileText,
            details: [
              "लॉगिन के बाद, आपको दो विकल्प दिखेंगे:",
              "विकल्प 1: 'मेरे पास भूमि है (7/12 दस्तावेज)' - यदि आपके पास कानूनी स्वामित्व है",
              "विकल्प 2: 'मैं भूमि पट्टे पर लेता हूं' - यदि आप पट्टे की भूमि पर खेती करते हैं",
              "अपनी स्थिति के आधार पर उपयुक्त विकल्प चुनें"
            ],
            tips: [
              "भूमि स्वामित्व बेहतर ऋण शर्तें प्रदान करता है",
              "पट्टे की भूमि के लिए अतिरिक्त दस्तावेज चाहिए",
              "ईमानदारी से चुनें क्योंकि यह आपके मूल्यांकन को प्रभावित करता है"
            ]
          },
          {
            title: "दस्तावेज अपलोड (भूमि मालिकों के लिए)",
            description: "अपना 7/12 दस्तावेज अपलोड और सत्यापित करें",
            icon: Shield,
            details: [
              "अपना 7/12 भूमि स्वामित्व दस्तावेज अपलोड करें (JPG, PNG, या PDF)",
              "सिस्टम OCR तकनीक का उपयोग करके जानकारी निकालेगा",
              "सत्यापित करें कि निकाली गई जानकारी आपके रिकॉर्ड से मेल खाती है",
              "अपनी लॉगिन साख के साथ नाम मिलान की पुष्टि करें"
            ],
            tips: [
              "सुनिश्चित करें कि दस्तावेज स्पष्ट और पढ़ने योग्य है",
              "फ़ाइल का आकार 5MB से कम होना चाहिए",
              "दस्तावेज पर नाम आपके लॉगिन नाम से मेल खाना चाहिए"
            ]
          },
          {
            title: "मूल्यांकन फॉर्म पूरा करें",
            description: "अपनी खेती के बारे में विस्तृत जानकारी भरें",
            icon: BarChart3,
            details: [
              "व्यक्तिगत जानकारी: नाम सत्यापन, आयु, अनुभव",
              "आधार सत्यापन: 12-अंकीय नंबर दर्ज करें और OTP से सत्यापित करें",
              "कृषि डेटा: फसलें, उत्पादन, सिंचाई, मिट्टी का स्वास्थ्य",
              "वित्तीय जानकारी: आय, व्यय, ऋण आवश्यकताएं",
              "सामुदायिक डेटा: सहकारी सदस्यता, प्रशिक्षण कार्यक्रम"
            ],
            tips: [
              "सभी जानकारी के साथ ईमानदार और सटीक रहें",
              "डेमो के लिए: आधार सत्यापन के लिए OTP 123456 का उपयोग करें",
              "कृषि आय के सभी स्रोतों को शामिल करें",
              "आप जो भी सरकारी योजनाओं में नामांकित हैं उनका उल्लेख करें"
            ]
          },
          {
            title: "अपना क्रेडिट स्कोर प्राप्त करें",
            description: "अपने मूल्यांकन परिणामों की समीक्षा करें",
            icon: Download,
            details: [
              "100 में से अपना क्रेडिट स्कोर प्राप्त करें",
              "अपने जोखिम स्तर को समझें (कम/मध्यम/उच्च)",
              "उन कारकों की समीक्षा करें जिन्होंने आपके स्कोर को प्रभावित किया",
              "सुधार के लिए व्यक्तिगत सिफारिशें प्राप्त करें",
              "ऋण पात्रता और चुकौती अनुमान देखें"
            ],
            tips: [
              "बैंक की यात्राओं के लिए अपनी रिपोर्ट डाउनलोड करें",
              "उच्च प्रभाव वाले सुधार क्षेत्रों पर ध्यान दें",
              "भविष्य के संदर्भ के लिए मूल्यांकन सहेजें",
              "संभावित ऋणदाताओं के साथ परिणाम साझा करें"
            ]
          }
        ],
        flowSteps: {
          title: "पूर्ण मूल्यांकन प्रवाह",
          steps: [
            "लॉगिन/रजिस्टर → भाषा चुनें",
            "भूमि प्रकार चुनें (स्वामित्व/पट्टा)",
            "दस्तावेज अपलोड करें (यदि भूमि मालिक हैं)",
            "मूल्यांकन फॉर्म पूरा करें",
            "आधार + OTP सत्यापन",
            "क्रेडिट स्कोर और सिफारिशें प्राप्त करें",
            "रिपोर्ट डाउनलोड करें और अगले कदम"
          ]
        },
        importantNotes: {
          title: "महत्वपूर्ण नोट्स",
          notes: [
            "यह शैक्षिक उद्देश्यों के लिए एक प्रदर्शन प्रणाली है",
            "वास्तविक कार्यान्वयन के लिए सरकारी API एकीकरण की आवश्यकता होगी",
            "सभी डेटा डेमो उद्देश्यों के लिए स्थानीय रूप से संग्रहीत है",
            "आधार सत्यापन के लिए डेमो OTP 123456 का उपयोग करें",
            "क्रेडिट स्कोर AI एल्गोरिदम का उपयोग करके गणना किए जाते हैं",
            "परिणाम केवल मार्गदर्शन के लिए हैं - बैंक अंतिम निर्णय लेते हैं"
          ]
        }
      },
      mr: {
        title: "कृषि सहाय कसा वापरावा",
        subtitle: "तुमचे कृषी क्रेडिट मूल्यांकन मिळवण्यासाठी संपूर्ण मार्गदर्शक",
        steps: [
          {
            title: "खाते तयार करा आणि लॉगिन करा",
            description: "तुमच्या क्रेडिट मूल्यांकन प्रवासाची सुरुवात करा",
            icon: User,
            details: [
              "कृषि सहाय वेबसाइटला भेट द्या",
              "जर तुम्ही नवीन वापरकर्ता असाल तर 'खाते तयार करा' वर क्लिक करा",
              "तुमचे नाव, ईमेल, फोन नंबर भरा आणि पासवर्ड तयार करा",
              "मानवी सत्यापन (CAPTCHA) पूर्ण करा",
              "तुमच्या क्रेडेंशियल्ससह लॉगिन करा"
            ],
            tips: [
              "वैध ईमेल पत्ता आणि फोन नंबर वापरा",
              "सुरक्षिततेसाठी मजबूत पासवर्ड निवडा",
              "भविष्यातील वापरासाठी तुमचे लॉगिन क्रेडेंशियल्स लक्षात ठेवा"
            ]
          },
          {
            title: "जमिनीचा प्रकार निवडा",
            description: "तुमची जमीन मालकी स्थिती निवडा",
            icon: FileText,
            details: [
              "लॉगिन केल्यानंतर, तुम्हाला दोन पर्याय दिसतील:",
              "पर्याय 1: 'माझ्याकडे जमीन आहे (7/12 कागदपत्र)' - जर तुमच्याकडे कायदेशीर मालकी आहे",
              "पर्याय 2: 'मी जमीन भाड्याने घेतो' - जर तुम्ही भाड्याच्या जमिनीवर शेती करता",
              "तुमच्या परिस्थितीनुसार योग्य पर्याय निवडा"
            ],
            tips: [
              "जमीन मालकी चांगल्या कर्जाच्या अटी देते",
              "भाड्याच्या जमिनीसाठी अतिरिक्त कागदपत्रे लागतात",
              "प्रामाणिकपणे निवडा कारण हे तुमच्या मूल्यांकनावर परिणाम करते"
            ]
          },
          {
            title: "कागदपत्र अपलोड (जमीन मालकांसाठी)",
            description: "तुमचे 7/12 कागदपत्र अपलोड आणि सत्यापित करा",
            icon: Shield,
            details: [
              "तुमचे 7/12 जमीन मालकी कागदपत्र अपलोड करा (JPG, PNG, किंवा PDF)",
              "सिस्टम OCR तंत्रज्ञान वापरून माहिती काढेल",
              "काढलेले तपशील तुमच्या रेकॉर्डशी जुळतात याची पडताळणी करा",
              "तुमच्या लॉगिन क्रेडेंशियल्सशी नाव जुळण्याची पुष्टी करा"
            ],
            tips: [
              "कागदपत्र स्पष्ट आणि वाचनीय असल्याची खात्री करा",
              "फाइल आकार 5MB पेक्षा कमी असावा",
              "कागदपत्रावरील नाव तुमच्या लॉगिन नावाशी जुळले पाहिजे"
            ]
          },
          {
            title: "मूल्यांकन फॉर्म पूर्ण करा",
            description: "तुमच्या शेतकीबद्दल तपशीलवार माहिती भरा",
            icon: BarChart3,
            details: [
              "वैयक्तिक माहिती: नाव सत्यापन, वय, अनुभव",
              "आधार सत्यापन: 12-अंकी नंबर टाका आणि OTP ने सत्यापित करा",
              "शेतकी डेटा: पिके, उत्पादन, सिंचन, मातीचे आरोग्य",
              "आर्थिक माहिती: उत्पन्न, खर्च, कर्जाच्या गरजा",
              "सामुदायिक डेटा: सहकारी सदस्यत्व, प्रशिक्षण कार्यक्रम"
            ],
            tips: [
              "सर्व माहितीसह प्रामाणिक आणि अचूक रहा",
              "डेमोसाठी: आधार सत्यापनासाठी OTP 123456 वापरा",
              "कृषी उत्पन्नाचे सर्व स्रोत समाविष्ट करा",
              "तुम्ही नोंदणी केलेल्या कोणत्याही सरकारी योजनांचा उल्लेख करा"
            ]
          },
          {
            title: "तुमचा क्रेडिट स्कोअर मिळवा",
            description: "तुमच्या मूल्यांकन परिणामांचे पुनरावलोकन करा",
            icon: Download,
            details: [
              "100 पैकी तुमचा क्रेडिट स्कोअर मिळवा",
              "तुमची जोखीम पातळी समजून घ्या (कमी/मध्यम/उच्च)",
              "तुमच्या स्कोअरवर प्रभाव टाकणार्‍या घटकांचे पुनरावलोकन करा",
              "सुधारणेसाठी वैयक्तिक शिफारशी मिळवा",
              "कर्ज पात्रता आणि परतफेड अंदाज पहा"
            ],
            tips: [
              "बँक भेटींसाठी तुमचा अहवाल डाउनलोड करा",
              "उच्च प्रभाव सुधारणा क्षेत्रांवर लक्ष केंद्रित करा",
              "भविष्यातील संदर्भासाठी मूल्यांकन जतन करा",
              "संभाव्य कर्जदारांसह परिणाम सामायिक करा"
            ]
          }
        ],
        flowSteps: {
          title: "संपूर्ण मूल्यांकन प्रवाह",
          steps: [
            "लॉगिन/नोंदणी → भाषा निवडा",
            "जमिनीचा प्रकार निवडा (मालकी/भाडे)",
            "कागदपत्रे अपलोड करा (जर जमीन मालक असाल)",
            "मूल्यांकन फॉर्म पूर्ण करा",
            "आधार + OTP सत्यापन",
            "क्रेडिट स्कोअर आणि शिफारशी मिळवा",
            "अहवाल डाउनलोड करा आणि पुढील पायऱ्या"
          ]
        },
        importantNotes: {
          title: "महत्वाच्या नोंदी",
          notes: [
            "ही शैक्षणिक हेतूंसाठी एक प्रात्यक्षिक प्रणाली आहे",
            "वास्तविक अंमलबजावणीसाठी सरकारी API एकीकरण आवश्यक असेल",
            "सर्व डेटा डेमो हेतूंसाठी स्थानिक पातळीवर संग्रहीत केला जातो",
            "आधार सत्यापनासाठी डेमो OTP 123456 वापरा",
            "क्रेडिट स्कोअर AI अल्गोरिदम वापरून गणना केले जातात",
            "परिणाम फक्त मार्गदर्शनासाठी आहेत - बँका अंतिम निर्णय घेतात"
          ]
        }
      }
    };
    return content[language as keyof typeof content] || content.en;
  };

  const content = getContent();

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
              <span>Back to Home</span>
            </button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
              <p className="text-lg text-gray-600">{content.subtitle}</p>
            </div>
          </div>

          <div className="p-6">
            {/* Quick Flow Overview */}
            <div className="mb-8 bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{content.flowSteps.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {content.flowSteps.steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Steps */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Steps Navigation */}
              <div className="lg:col-span-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Steps</h2>
                <div className="space-y-2">
                  {content.steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveStep(index)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          activeStep === index
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activeStep === index ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">{step.title}</div>
                            <div className="text-xs opacity-75">{step.description}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Details */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    {React.createElement(content.steps[activeStep].icon, {
                      className: "w-8 h-8 text-green-600"
                    })}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {content.steps[activeStep].title}
                      </h3>
                      <p className="text-gray-600">{content.steps[activeStep].description}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Details */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Play className="w-4 h-4 mr-2 text-green-600" />
                        Step-by-step process:
                      </h4>
                      <ul className="space-y-2">
                        {content.steps[activeStep].details.map((detail, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <ChevronRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <Info className="w-4 h-4 mr-2 text-blue-600" />
                        Important tips:
                      </h4>
                      <ul className="space-y-2">
                        {content.steps[activeStep].tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                      disabled={activeStep === 0}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setActiveStep(Math.min(content.steps.length - 1, activeStep + 1))}
                      disabled={activeStep === content.steps.length - 1}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                {content.importantNotes.title}
              </h2>
              <ul className="space-y-2">
                {content.importantNotes.notes.map((note, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Support */}
            <div className="mt-8 text-center bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you have any questions or need assistance, please contact our support team.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Email: support@agricreditscore.com</p>
                <p>Phone: +91-1800-XXX-XXXX</p>
                <p>Available: Monday to Friday, 9 AM to 6 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;