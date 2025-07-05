import React from 'react';
import { FileText, Users, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface LandOptionsPageProps {
  onSelectOption: (option: 'owned' | 'lease') => void;
}

const LandOptionsPage: React.FC<LandOptionsPageProps> = ({ onSelectOption }) => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();

  const getContent = () => {
    const content = {
      en: {
        welcome: `Welcome, ${user?.name}!`,
        subtitle: "Choose your land ownership type to proceed with credit assessment",
        ownedLand: {
          title: "I Own Land (7/12 Document)",
          description: "If you have legal ownership of agricultural land with 7/12 documentation",
          features: [
            "Upload 7/12 document for verification",
            "Faster processing with land ownership proof",
            "Better loan terms and interest rates",
            "Higher credit score potential"
          ]
        },
        leaseLand: {
          title: "I Lease Land",
          description: "If you farm on leased land without ownership documents",
          features: [
            "Detailed assessment with stricter verification",
            "Lease agreement documentation required",
            "Reference contacts verification",
            "Alternative credit scoring model"
          ]
        },
        selectBtn: "Select This Option",
        logout: "Logout"
      },
      hi: {
        welcome: `स्वागत है, ${user?.name}!`,
        subtitle: "क्रेडिट मूल्यांकन के साथ आगे बढ़ने के लिए अपनी भूमि स्वामित्व का प्रकार चुनें",
        ownedLand: {
          title: "मेरे पास भूमि है (7/12 दस्तावेज)",
          description: "यदि आपके पास 7/12 दस्तावेज के साथ कृषि भूमि का कानूनी स्वामित्व है",
          features: [
            "सत्यापन के लिए 7/12 दस्तावेज अपलोड करें",
            "भूमि स्वामित्व प्रमाण के साथ तेज़ प्रसंस्करण",
            "बेहतर ऋण शर्तें और ब्याज दरें",
            "उच्च क्रेडिट स्कोर की संभावना"
          ]
        },
        leaseLand: {
          title: "मैं भूमि पट्टे पर लेता हूं",
          description: "यदि आप स्वामित्व दस्तावेजों के बिना पट्टे की भूमि पर खेती करते हैं",
          features: [
            "सख्त सत्यापन के साथ विस्तृत मूल्यांकन",
            "पट्टा समझौता दस्तावेज आवश्यक",
            "संदर्भ संपर्क सत्यापन",
            "वैकल्पिक क्रेडिट स्कोरिंग मॉडल"
          ]
        },
        selectBtn: "यह विकल्प चुनें",
        logout: "लॉगआउट"
      },
      mr: {
        welcome: `स्वागत आहे, ${user?.name}!`,
        subtitle: "क्रेडिट मूल्यांकनासह पुढे जाण्यासाठी तुमच्या जमिनीच्या मालकीचा प्रकार निवडा",
        ownedLand: {
          title: "माझ्याकडे जमीन आहे (7/12 कागदपत्र)",
          description: "जर तुमच्याकडे 7/12 कागदपत्रांसह कृषी जमिनीची कायदेशीर मालकी आहे",
          features: [
            "सत्यापनासाठी 7/12 कागदपत्र अपलोड करा",
            "जमीन मालकी पुराव्यासह जलद प्रक्रिया",
            "चांगल्या कर्जाच्या अटी आणि व्याज दर",
            "उच्च क्रेडिट स्कोअरची शक्यता"
          ]
        },
        leaseLand: {
          title: "मी जमीन भाड्याने घेतो",
          description: "जर तुम्ही मालकी कागदपत्रांशिवाय भाड्याच्या जमिनीवर शेती करता",
          features: [
            "कठोर सत्यापनासह तपशीलवार मूल्यांकन",
            "भाडेपट्टा करार कागदपत्र आवश्यक",
            "संदर्भ संपर्क सत्यापन",
            "पर्यायी क्रेडिट स्कोअरिंग मॉडेल"
          ]
        },
        selectBtn: "हा पर्याय निवडा",
        logout: "लॉगआउट"
      }
    };
    return content[language as keyof typeof content] || content.en;
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {content.welcome}
              </h1>
              <p className="text-gray-600">{content.subtitle}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>{content.logout}</span>
            </button>
          </div>
        </div>

        {/* Land Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Owned Land Option */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {content.ownedLand.title}
              </h2>
              <p className="text-gray-600">{content.ownedLand.description}</p>
            </div>

            <div className="space-y-3 mb-8">
              {content.ownedLand.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-green-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onSelectOption('owned')}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <span>{content.selectBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Lease Land Option */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {content.leaseLand.title}
              </h2>
              <p className="text-gray-600">{content.leaseLand.description}</p>
            </div>

            <div className="space-y-3 mb-8">
              {content.leaseLand.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-blue-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onSelectOption('lease')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <span>{content.selectBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-yellow-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Important Information</h3>
              <p className="text-yellow-700 text-sm">
                Your selection will determine the type of verification and assessment process. 
                Land ownership provides better loan terms, while lease land requires additional documentation 
                and stricter verification for risk assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandOptionsPage;