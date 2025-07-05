import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getWelcomeMessage = React.useCallback(() => {
    const welcomeMessages = {
      en: "Hello! I'm your AgriCredit assistant. I can help you with loan processes, subsidies, and farming best practices. How can I assist you today?",
      hi: "नमस्ते! मैं आपका एग्रीक्रेडिट सहायक हूं। मैं आपकी ऋण प्रक्रियाओं, सब्सिडी और कृषि की बेहतरीन प्रथाओं में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
      mr: "नमस्कार! मी तुमचा एग्रीक्रेडिट सहायक आहे. मी तुम्हाला कर्ज प्रक्रिया, अनुदान आणि शेतकीच्या उत्तम पद्धतींमध्ये मदत करू शकतो. आज मी तुमची कशी मदत करू शकतो?"
    };
    return welcomeMessages[language] || welcomeMessages.en;
  }, [language]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chatbot opens
      const welcomeMessage = getWelcomeMessage();
      setMessages([{
        id: Date.now().toString(),
        text: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length, getWelcomeMessage]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
      en: {
        loan: "For loan processes: 1) Complete your credit assessment 2) Gather required documents (7/12, Aadhaar, bank statements) 3) Visit your nearest bank with the AgriCredit report 4) Follow up on your application status. Would you like more details on any step?",
        subsidy: "Available subsidies include: PM-KISAN (₹6,000/year), Pradhan Mantri Fasal Bima Yojana (crop insurance), Kisan Credit Card (low interest loans), and various state-specific schemes. Visit pmkisan.gov.in for more information.",
        farming: "Best farming practices: 1) Soil testing every 2 years 2) Use certified seeds 3) Implement drip irrigation 4) Practice crop rotation 5) Use organic fertilizers 6) Monitor weather patterns. Which practice would you like to know more about?",
        credit: "Your credit score depends on: farming experience, land size, yield performance, soil health, irrigation methods, income vs expenses, and community engagement. Focus on improving these factors for a better score.",
        default: "I can help you with loan processes, government subsidies, and farming best practices. Please ask me about any of these topics!"
      },
      hi: {
        loan: "ऋण प्रक्रिया के लिए: 1) अपना क्रेडिट मूल्यांकन पूरा करें 2) आवश्यक दस्तावेज एकत्र करें (7/12, आधार, बैंक स्टेटमेंट) 3) एग्रीक्रेडिट रिपोर्ट के साथ अपने निकटतम बैंक जाएं 4) अपने आवेदन की स्थिति का पालन करें। क्या आप किसी चरण के बारे में और जानना चाहते हैं?",
        subsidy: "उपलब्ध सब्सिडी में शामिल हैं: पीएम-किसान (₹6,000/वर्ष), प्रधानमंत्री फसल बीमा योजना (फसल बीमा), किसान क्रेडिट कार्ड (कम ब्याज ऋण), और विभिन्न राज्य-विशिष्ट योजनाएं। अधिक जानकारी के लिए pmkisan.gov.in पर जाएं।",
        farming: "सर्वोत्तम कृषि प्रथाएं: 1) हर 2 साल में मिट्टी परीक्षण 2) प्रमाणित बीजों का उपयोग 3) ड्रिप सिंचाई लागू करें 4) फसल चक्र का अभ्यास करें 5) जैविक उर्वरकों का उपयोग करें 6) मौसम पैटर्न की निगरानी करें। आप किस प्रथा के बारे में और जानना चाहते हैं?",
        credit: "आपका क्रेडिट स्कोर इन पर निर्भर करता है: कृषि अनुभव, भूमि का आकार, उत्पादन प्रदर्शन, मिट्टी का स्वास्थ्य, सिंचाई के तरीके, आय बनाम व्यय, और सामुदायिक सहभागिता। बेहतर स्कोर के लिए इन कारकों में सुधार पर ध्यान दें।",
        default: "मैं आपकी ऋण प्रक्रियाओं, सरकारी सब्सिडी और कृषि की बेहतरीन प्रथाओं में मदद कर सकता हूं। कृपया मुझसे इनमें से किसी भी विषय के बारे में पूछें!"
      },
      mr: {
        loan: "कर्ज प्रक्रियेसाठी: 1) तुमचे क्रेडिट मूल्यांकन पूर्ण करा 2) आवश्यक कागदपत्रे गोळा करा (7/12, आधार, बँक स्टेटमेंट) 3) एग्रीक्रेडिट अहवालासह तुमच्या जवळच्या बँकेत जा 4) तुमच्या अर्जाच्या स्थितीचा मागोवा घ्या. तुम्हाला कोणत्याही पायरीबद्दल अधिक तपशील हवेत का?",
        subsidy: "उपलब्ध अनुदानांमध्ये समाविष्ट आहे: पीएम-किसान (₹6,000/वर्ष), प्रधानमंत्री फसल बीमा योजना (पीक विमा), किसान क्रेडिट कार्ड (कमी व्याज कर्ज), आणि विविध राज्य-विशिष्ट योजना. अधिक माहितीसाठी pmkisan.gov.in ला भेट द्या.",
        farming: "उत्तम शेतकी पद्धती: 1) दर 2 वर्षांनी माती चाचणी 2) प्रमाणित बियाणे वापरा 3) ठिबक सिंचन लागू करा 4) पीक फेरफार करा 5) सेंद्रिय खतांचा वापर करा 6) हवामान पॅटर्नचे निरीक्षण करा. तुम्हाला कोणत्या पद्धतीबद्दल अधिक जाणून घ्यायचे आहे?",
        credit: "तुमचा क्रेडिट स्कोअर यावर अवलंबून आहे: शेतकीचा अनुभव, जमिनीचा आकार, उत्पादन कामगिरी, मातीचे आरोग्य, सिंचन पद्धती, उत्पन्न विरुद्ध खर्च, आणि सामुदायिक सहभाग. चांगल्या स्कोअरसाठी या घटकांमध्ये सुधारणा करण्यावर लक्ष केंद्रित करा.",
        default: "मी तुम्हाला कर्ज प्रक्रिया, सरकारी अनुदान आणि शेतकीच्या उत्तम पद्धतींमध्ये मदत करू शकतो. कृपया मला या विषयांपैकी कोणत्याही विषयाबद्दल विचारा!"
      }
    };

    const langResponses = responses[language] || responses.en;

    if (lowerMessage.includes('loan') || lowerMessage.includes('ऋण') || lowerMessage.includes('कर्ज')) {
      return langResponses.loan;
    } else if (lowerMessage.includes('subsidy') || lowerMessage.includes('सब्सिडी') || lowerMessage.includes('अनुदान')) {
      return langResponses.subsidy;
    } else if (lowerMessage.includes('farming') || lowerMessage.includes('कृषि') || lowerMessage.includes('शेती')) {
      return langResponses.farming;
    } else if (lowerMessage.includes('credit') || lowerMessage.includes('क्रेडिट') || lowerMessage.includes('स्कोर')) {
      return langResponses.credit;
    } else {
      return langResponses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">AgriCredit Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'mr')}
                className="bg-green-700 text-white text-sm rounded px-2 py-1 border-none outline-none"
              >
                <option value="en">EN</option>
                <option value="hi">हि</option>
                <option value="mr">मर</option>
              </select>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'en' ? 'Type your message...' : 
                           language === 'hi' ? 'अपना संदेश टाइप करें...' : 
                           'तुमचा संदेश टाइप करा...'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;