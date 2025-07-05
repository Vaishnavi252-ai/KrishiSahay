import React, { useState } from 'react';
import { User, Lock, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import CaptchaVerification from './CaptchaVerification';


interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { login, register } = useAuth();
  const { language } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getContent = () => {
    const content = {
      en: {
        welcome: "Welcome to Krishi Sahay! Loans made simple",
        subtitle: "AI-Powered Credit Assessment for Farmers",
        loginTitle: "Login to Your Account",
        registerTitle: "Create New Account",
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        password: "Password",
        confirmPassword: "Confirm Password",
        loginBtn: "Login",
        registerBtn: "Create Account",
        switchToRegister: "Don't have an account? Register here",
        switchToLogin: "Already have an account? Login here",
        invalidCredentials: "Invalid email/phone or password",
        userExists: "User already exists with this email or phone",
        passwordMismatch: "Passwords do not match",
        fillAllFields: "Please fill all required fields",
        registrationSuccess: "Account created successfully!"
      },
      hi: {
        welcome: "एग्रीक्रेडिट स्कोर में आपका स्वागत है",
        subtitle: "किसानों के लिए AI-संचालित ऋण मूल्यांकन",
        loginTitle: "अपने खाते में लॉगिन करें",
        registerTitle: "नया खाता बनाएं",
        name: "पूरा नाम",
        email: "ईमेल पता",
        phone: "फोन नंबर",
        password: "पासवर्ड",
        confirmPassword: "पासवर्ड की पुष्टि करें",
        loginBtn: "लॉगिन",
        registerBtn: "खाता बनाएं",
        switchToRegister: "खाता नहीं है? यहाँ रजिस्टर करें",
        switchToLogin: "पहले से खाता है? यहाँ लॉगिन करें",
        invalidCredentials: "गलत ईमेल/फोन या पासवर्ड",
        userExists: "इस ईमेल या फोन से उपयोगकर्ता पहले से मौजूद है",
        passwordMismatch: "पासवर्ड मेल नहीं खाते",
        fillAllFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
        registrationSuccess: "खाता सफलतापूर्वक बनाया गया!"
      },
      mr: {
        welcome: "एग्रीक्रेडिट स्कोअरमध्ये आपले स्वागत आहे",
        subtitle: "शेतकर्‍यांसाठी AI-संचालित कर्ज मूल्यांकन",
        loginTitle: "तुमच्या खात्यात लॉगिन करा",
        registerTitle: "नवीन खाते तयार करा",
        name: "पूर्ण नाव",
        email: "ईमेल पत्ता",
        phone: "फोन नंबर",
        password: "पासवर्ड",
        confirmPassword: "पासवर्डची पुष्टी करा",
        loginBtn: "लॉगिन",
        registerBtn: "खाते तयार करा",
        switchToRegister: "खाते नाही? येथे नोंदणी करा",
        switchToLogin: "आधीच खाते आहे? येथे लॉगिन करा",
        invalidCredentials: "चुकीचा ईमेल/फोन किंवा पासवर्ड",
        userExists: "या ईमेल किंवा फोनसह वापरकर्ता आधीच अस्तित्वात आहे",
        passwordMismatch: "पासवर्ड जुळत नाहीत",
        fillAllFields: "कृपया सर्व आवश्यक फील्ड भरा",
        registrationSuccess: "खाते यशस्वीरित्या तयार केले!"
      }
    };
    return content[language as keyof typeof content] || content.en;
  };

  const content = getContent();

  const handleCaptchaComplete = (verified: boolean) => {
    if (verified) {
      setShowCaptcha(false);
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email || formData.phone, formData.password);
        if (success) {
          onLoginSuccess();
        } else {
          setError(content.invalidCredentials);
        }
      } else {
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
          setError(content.fillAllFields);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError(content.passwordMismatch);
          return;
        }
        
        const success = await register(
          formData.name,
          formData.email,
          formData.phone,
          formData.password,
          language
        );
        
        if (success) {
          onLoginSuccess();
        } else {
          setError(content.userExists);
        }
      }

    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      setShowCaptcha(true);
    } else {
      handleSubmit();
    }
  };

  if (showCaptcha) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <CaptchaVerification onVerificationComplete={handleCaptchaComplete} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {content.welcome}
            </h1>
            <p className="text-gray-600 mb-6">{content.subtitle}</p>
            
            {/* Language Selector */}
            <div className="flex justify-center mb-6">
              <LanguageSelector />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {isLogin ? content.loginTitle : content.registerTitle}
              </h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content.name}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required={!isLogin}
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content.phone}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.password}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content.confirmPassword}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                ) : (
                  isLogin ? content.loginBtn : content.registerBtn
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      password: '',
                      confirmPassword: ''
                    });
                  }}
                  className="text-green-600 hover:text-green-800 text-sm underline"
                >
                  {isLogin ? content.switchToRegister : content.switchToLogin}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;