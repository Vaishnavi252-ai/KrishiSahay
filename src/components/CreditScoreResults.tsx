import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, AlertTriangle, CheckCircle, FileText, Info, ChevronDown, ChevronUp, ArrowRight, Download, Share2, Save, Mail } from 'lucide-react';
import type { CreditScore } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { downloadPDF, generateCreditReport, saveToLocalStorage } from '../utils/downloadUtils';

interface CreditScoreResultsProps {
  creditScore: CreditScore;
  onBack: () => void;
  onViewImprovements: () => void;
  farmerName?: string;
}

const CreditScoreResults: React.FC<CreditScoreResultsProps> = ({ 
  creditScore, 
  onBack, 
  onViewImprovements,
  farmerName = "Farmer"
}) => {
  const { t, language } = useLanguage();
  const [showNextSteps, setShowNextSteps] = useState(true);
  const [showEnglishTranslation, setShowEnglishTranslation] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleDownloadReport = () => {
    const report = generateCreditReport(creditScore, farmerName);
    downloadPDF(report, `AgriCredit_Report_${farmerName}`);
  };

  const handleShareWithLenders = () => {
    setShowShareDialog(true);
  };

  const handleSaveForLater = () => {
    const savedId = saveToLocalStorage({
      creditScore,
      farmerName,
      type: 'credit_assessment'
    }, 'agricredit_saved_assessment');
    
    alert(`Assessment saved successfully! ID: ${savedId}\nYou can resume later using this ID.`);
  };

  const handleEmailShare = () => {
    const subject = `AgriCredit Score Report - ${farmerName}`;
    const body = `Dear Lender,

Please find the AgriCredit Score assessment for ${farmerName}:

Credit Score: ${creditScore.score}/100
Risk Level: ${creditScore.riskLevel.toUpperCase()}

Key Factors:
${creditScore.factors.map((factor, index) => 
  `${index + 1}. ${factor.name}: ${factor.impact > 0 ? '+' : ''}${factor.impact} points`
).join('\n')}

This assessment was generated using AI-powered agricultural data analysis.

Best regards,
AgriCredit Score System`;

    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setShowShareDialog(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="w-8 h-8 text-green-600" />;
    if (score >= 50) return <TrendingUp className="w-8 h-8 text-yellow-600" />;
    return <AlertTriangle className="w-8 h-8 text-red-600" />;
  };

  const getLoanRecommendation = () => {
    const score = creditScore.score;
    
    if (score >= 70) {
      return {
        recommendation: language === 'en' ? 'Recommended for loan approval' : 
                      language === 'hi' ? 'ऋण अनुमोदन के लिए अनुशंसित' : 
                      'कर्ज मंजुरीसाठी शिफारसीत',
        duration: language === 'en' ? '12-24 months repayment period' :
                 language === 'hi' ? '12-24 महीने की चुकौती अवधि' :
                 '12-24 महिन्यांचा परतफेड कालावधी',
        color: 'text-green-600'
      };
    } else if (score >= 50) {
      return {
        recommendation: language === 'en' ? 'Consider smaller loan amount or co-signer' :
                      language === 'hi' ? 'छोटी ऋण राशि या सह-हस्ताक्षरकर्ता पर विचार करें' :
                      'लहान कर्ज रक्कम किंवा सह-स्वाक्षरीकर्त्याचा विचार करा',
        duration: language === 'en' ? '6-18 months repayment period' :
                 language === 'hi' ? '6-18 महीने की चुकौती अवधि' :
                 '6-18 महिन्यांचा परतफेड कालावधी',
        color: 'text-yellow-600'
      };
    } else {
      return {
        recommendation: language === 'en' ? 'Focus on improvements before applying' :
                      language === 'hi' ? 'आवेदन से पहले सुधार पर ध्यान दें' :
                      'अर्ज करण्यापूर्वी सुधारणांवर लक्ष द्या',
        duration: language === 'en' ? 'Reapply after 6-12 months of improvements' :
                 language === 'hi' ? '6-12 महीने के सुधार के बाद पुनः आवेदन करें' :
                 '6-12 महिन्यांच्या सुधारणानंतर पुन्हा अर्ज करा',
        color: 'text-red-600'
      };
    }
  };

  const loanRec = getLoanRecommendation();

  const nextStepsMarathi = {
    title: "पुढील पायऱ्या - बँकेत कर्ज मिळवण्यासाठी",
    subtitle: "आपला क्रेडिट स्कोर तयार झाला आहे. आता बँकेत जाण्यापूर्वी ही महत्वाची माहिती वाचा:",
    steps: [
      {
        number: "१",
        title: "ओळख पडताळणी",
        description: "आधार कार्ड घेऊन जा आणि बँकेत OTP पडताळणी करा. मोबाईल नंबर आधार कार्डाशी जोडलेला असावा."
      },
      {
        number: "२", 
        title: "जमीन कागदपत्र",
        description: "७/१२ उतारा, खसरा नंबर, किंवा जमीन मालकी दाखवणारी कागदपत्र घेऊन जा. मूळ आणि फोटोकॉपी दोन्ही आवश्यक."
      },
      {
        number: "३",
        title: "उत्पन्न पुरावा", 
        description: "शेतीचे उत्पन्न, विक्री बिल, किंवा सहकारी संस्थेचा दाखला घेऊन जा. मासिक खर्चाची यादी तयार करा."
      },
      {
        number: "४",
        title: "सहकारी सदस्यत्व",
        description: "जर तुम्ही कोणत्याही शेतकरी सहकारी संस्थेचे सदस्य असाल तर त्याचा दाखला घेऊन जा."
      },
      {
        number: "५", 
        title: "हंगामी हप्ते",
        description: "पीक कापणीनुसार हप्ते भरण्याची सुविधा मागा. बँकेला सांगा की तुमचे उत्पन्न हंगामानुसार येते."
      }
    ],
    important: {
      title: "महत्वाची सूचना:",
      points: [
        "हा स्कोर फक्त मार्गदर्शनासाठी आहे - अंतिम निर्णय बँकेचा असेल",
        "सर्व कागदपत्रांची प्रत तयार ठेवा",
        "शंका असल्यास बँकेशी संपर्क साधा",
        "डेटा बदलल्यास सिस्टममध्ये अपडेट करा"
      ]
    },
    bankAdvice: {
      title: "बँकेत जाताना:",
      tips: [
        "सकाळी लवकर जा - कमी गर्दी असते",
        "सर्व कागदपत्र एका फाईलमध्ये ठेवा", 
        "बँक व्यवस्थापकाशी थेट बोला",
        "कर्जाचा हेतू स्पष्टपणे सांगा"
      ]
    }
  };

  const nextStepsEnglish = {
    title: "Next Steps - To Get Loan from Bank",
    subtitle: "Your credit score is ready. Read this important information before visiting the bank:",
    steps: [
      {
        number: "1",
        title: "Identity Verification", 
        description: "Take your Aadhaar card and complete OTP verification at the bank. Mobile number should be linked to Aadhaar."
      },
      {
        number: "2",
        title: "Land Documents",
        description: "Bring 7/12 extract, survey number, or land ownership documents. Both original and photocopy required."
      },
      {
        number: "3", 
        title: "Income Proof",
        description: "Bring agricultural income records, sale bills, or cooperative society certificate. Prepare monthly expense list."
      },
      {
        number: "4",
        title: "Cooperative Membership", 
        description: "If you are member of any farmer cooperative society, bring membership certificate."
      },
      {
        number: "5",
        title: "Seasonal Repayment",
        description: "Request seasonal repayment facility based on crop harvest. Tell bank your income is seasonal."
      }
    ],
    important: {
      title: "Important Notice:",
      points: [
        "This score is for guidance only - final decision rests with the bank",
        "Keep copies of all documents ready", 
        "Contact bank if you have doubts",
        "Update system if your data changes"
      ]
    },
    bankAdvice: {
      title: "When visiting bank:",
      tips: [
        "Go early morning - less crowded",
        "Keep all documents in one file",
        "Speak directly with bank manager", 
        "Clearly explain loan purpose"
      ]
    }
  };

  const currentSteps = language === 'mr' ? nextStepsMarathi : nextStepsEnglish;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t('backToHome')}</span>
            </button>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {language === 'en' ? `Hello ${farmerName}! Your Credit Assessment` :
                 language === 'hi' ? `नमस्ते ${farmerName}! आपका क्रेडिट मूल्यांकन` :
                 `नमस्कार ${farmerName}! तुमचे क्रेडिट मूल्यांकन`}
              </h2>
            </div>
          </div>

          <div className="p-6">
            {/* Credit Score Display */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {getScoreIcon(creditScore.score)}
                <div>
                  <div className={`text-5xl font-bold ${getScoreColor(creditScore.score)}`}>
                    {creditScore.score}
                  </div>
                  <div className="text-lg text-gray-600">out of 100</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-sm text-gray-600">{t('riskLevel')}:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(creditScore.riskLevel)}`}>
                  {t(creditScore.riskLevel)} {t('riskLevel').toLowerCase()}
                </span>
              </div>

              {/* Loan Recommendation */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {language === 'en' ? 'Loan Recommendation' :
                   language === 'hi' ? 'ऋण सिफारिश' :
                   'कर्ज शिफारस'}
                </h3>
                <p className={`font-medium ${loanRec.color}`}>{loanRec.recommendation}</p>
                <p className="text-sm text-gray-600 mt-1">{loanRec.duration}</p>
              </div>
            </div>

            {creditScore.loanEligibility && (
  <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
    <h3 className="font-semibold text-green-800 mb-2">Loan Eligibility Details</h3>
    <ul className="text-green-700 space-y-1 text-sm">
      <li><strong>Eligible:</strong> {creditScore.loanEligibility.eligible ? 'Yes' : 'No'}</li>
      <li><strong>Maximum Amount:</strong> ₹{creditScore.loanEligibility.maxAmount.toLocaleString()}</li>
      <li><strong>Recommended Period:</strong> {creditScore.loanEligibility.recommendedPeriod} months</li>
      <li><strong>Interest Rate:</strong> {creditScore.loanEligibility.interestRate}%</li>
      <li><strong>Estimated EMI:</strong> ₹{creditScore.loanEligibility.emi.toLocaleString()}</li>
    </ul>
  </div>
)}


            {/* Risk Assessment Recommendations */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                {language === 'en' ? 'Risk Assessment Recommendations' : 
                 language === 'hi' ? 'जोखिम मूल्यांकन सिफारिशें' : 
                 'जोखीम मूल्यांकन शिफारशी'}
              </h3>
              <p className="text-gray-700 mb-4">
                {language === 'en' ? 'The improvement suggestions below will appear in your chosen language (Marathi, Hindi, or English). If risk is high, please discuss further with your bank.' :
                 language === 'hi' ? 'नीचे दिए गए सुधार सुझाव आपकी चुनी गई भाषा (मराठी, हिंदी, या अंग्रेजी) में दिखाई देंगे। यदि जोखिम अधिक है, तो कृपया अपने बैंक से आगे चर्चा करें।' :
                 'खालील सुधारणा सूचना तुमच्या निवडलेल्या भाषेत (मराठी, हिंदी, किंवा इंग्रजी) दिसतील. जर जोखीम जास्त असेल तर कृपया तुमच्या बँकेशी पुढे चर्चा करा.'}
              </p>
              <button
                onClick={onViewImprovements}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
              >
                <span>
                  {language === 'en' ? 'View Farming Improvements & Government Schemes' : 
                   language === 'hi' ? 'कृषि सुधार और सरकारी योजनाएं देखें' : 
                   'शेतकी सुधारणा आणि सरकारी योजना पहा'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Next Steps Guidance */}
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="p-4">
                <button
                  onClick={() => setShowNextSteps(!showNextSteps)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Info className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900">
                        {currentSteps.title}
                      </h3>
                      <p className="text-sm text-blue-700">
                        {currentSteps.subtitle}
                      </p>
                    </div>
                  </div>
                  {showNextSteps ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-600" />
                  )}
                </button>

                {showNextSteps && (
                  <div className="mt-6 space-y-6">
                    {/* Language Toggle for Marathi users */}
                    {language === 'mr' && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => setShowEnglishTranslation(!showEnglishTranslation)}
                          className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          {showEnglishTranslation ? 'मराठी मध्ये पहा' : 'Show in English'}
                        </button>
                      </div>
                    )}

                    {/* Steps */}
                    <div className="grid gap-4">
                      {currentSteps.steps.map((step, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-blue-100">
                          <div className="flex items-start space-x-3">
                            <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                              {step.number}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {step.title}
                              </h4>
                              <p className="text-sm text-gray-700">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Important Notice */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {currentSteps.important.title}
                      </h4>
                      <ul className="space-y-1">
                        {currentSteps.important.points.map((point, index) => (
                          <li key={index} className="text-sm text-yellow-700">
                            • {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bank Visit Tips */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">
                        {currentSteps.bankAdvice.title}
                      </h4>
                      <ul className="space-y-1">
                        {currentSteps.bankAdvice.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-green-700">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* English Translation for Marathi users */}
                    {language === 'mr' && showEnglishTranslation && (
                      <div className="border-t border-blue-200 pt-4">
                        <h4 className="font-semibold text-gray-800 mb-3">English Translation:</h4>
                        <div className="space-y-3 text-sm text-gray-600">
                          {nextStepsEnglish.steps.map((step, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded">
                              <strong>{step.number}. {step.title}:</strong> {step.description}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  {t('keyFactors')}
                </h3>
                <div className="space-y-3">
                  {creditScore.factors.map((factor, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                        <span className={`text-sm font-bold ${
                          factor.impact > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {factor.impact > 0 ? '+' : ''}{factor.impact}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">{factor.value}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full ${
                            factor.impact > 0 ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(Math.abs(factor.impact), 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-600" />
                  {t('recommendations')}
                </h3>
                <div className="space-y-3">
                  {creditScore.recommendations.map((recommendation, index) => (
                    <div key={index} className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Explanation */}
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Assessment Explanation</h3>
              <div className="space-y-2">
                {creditScore.explanation.map((point, index) => (
                  <p key={index} className="text-sm text-gray-700">• {point}</p>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button 
                onClick={handleDownloadReport}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-center font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
              <button 
                onClick={handleShareWithLenders}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with Lenders</span>
              </button>
              <button 
                onClick={handleSaveForLater}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg text-center font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save for Later</span>
              </button>
            </div>

            {/* Farewell Message */}
            <div className="mt-8 text-center bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'en' ? `Thank you for using AgriCredit Score, ${farmerName}!` :
                 language === 'hi' ? `एग्रीक्रेडिट स्कोर का उपयोग करने के लिए धन्यवाद, ${farmerName}!` :
                 `एग्रीक्रेडिट स्कोअर वापरल्याबद्दल धन्यवाद, ${farmerName}!`}
              </h3>
              <p className="text-gray-600">
                {language === 'en' ? 'Visit again to track your progress and update your assessment.' :
                 language === 'hi' ? 'अपनी प्रगति को ट्रैक करने और अपने मूल्यांकन को अपडेट करने के लिए फिर से आएं।' :
                 'तुमची प्रगती ट्रॅक करण्यासाठी आणि तुमचे मूल्यांकन अपडेट करण्यासाठी पुन्हा भेट द्या.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share with Lenders</h3>
            <p className="text-gray-600 mb-6">Choose how you'd like to share your credit assessment:</p>
            
            <div className="space-y-3">
              <button
                onClick={handleEmailShare}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Share via Email</span>
              </button>
              
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`AgriCredit Score: ${creditScore.score}/100 - Risk Level: ${creditScore.riskLevel}`);
                  alert('Assessment summary copied to clipboard!');
                  setShowShareDialog(false);
                }}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg transition-colors"
              >
                Copy Summary to Clipboard
              </button>
            </div>
            
            <button
              onClick={() => setShowShareDialog(false)}
              className="w-full mt-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditScoreResults;