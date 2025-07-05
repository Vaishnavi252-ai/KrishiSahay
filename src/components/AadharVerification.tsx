import React, { useState } from 'react';
import { Shield, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import CaptchaVerification from './CaptchaVerification';

interface AadhaarVerificationProps {
  onVerificationComplete: (verified: boolean) => void;
}

const AadhaarVerification: React.FC<AadhaarVerificationProps> = ({
  onVerificationComplete,
}) => {
  const { t, language } = useLanguage();
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'captcha' | 'aadhaar' | 'otp' | 'verified'>(
    'captcha'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCaptchaComplete = (verified: boolean) => {
    if (verified) {
      setStep('aadhaar');
    }
  };

  const handleAadhaarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaarNumber.length !== 12) {
      setError(t('invalidAadhaar'));
      return;
    }
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber }),
      });
      const data = await response.json();
      if (data.success) {
        setStep('otp');
      } else {
        setError('Error sending OTP. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError(t('invalidOtp'));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber, otp }),
      });
      const data = await response.json();
      if (data.verified) {
        setStep('verified');
        onVerificationComplete(true);
      } else {
        setError('Wrong OTP. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  const getContent = () => {
    const content = {
      en: {
        title: 'Identity Verification (Aadhaar)',
        subtitle:
          "Please enter your Aadhaar number and phone number to receive an OTP. Only after successful OTP verification you can continue.",
        aadhaarLabel: 'Aadhaar Number',
        aadhaarPlaceholder: 'Enter 12-digit Aadhaar number',
        phoneLabel: 'Phone Number',
        phonePlaceholder: 'Enter phone number (+91XXXXXXXXXX)',
        sendOtp: 'Send OTP',
        otpLabel: 'Enter OTP',
        otpPlaceholder: 'Enter 6-digit OTP',
        verifyOtp: 'Verify OTP',
        verified: 'Aadhaar Verified Successfully!',
        continue: 'Continue to Assessment',
        resendOtp: 'Resend OTP',
        otpSent: 'OTP sent to your phone ending with',
        demoDisclaimer:
          'This is a demonstration system. Real Aadhaar verification requires government API integration.',
      },
      hi: {
        title: 'पहचान सत्यापन (आधार)',
        subtitle:
          "कृपया अपना आधार नंबर और फोन नंबर दर्ज करें ताकि आपको OTP प्राप्त हो सके। केवल सफल OTP सत्यापन के बाद ही आप आगे बढ़ सकते हैं।",
        aadhaarLabel: 'आधार नंबर',
        aadhaarPlaceholder: '12 अंकों का आधार नंबर दर्ज करें',
        phoneLabel: 'फोन नंबर',
        phonePlaceholder: 'फोन नंबर दर्ज करें (+91XXXXXXXXXX)',
        sendOtp: 'OTP भेजें',
        otpLabel: 'OTP दर्ज करें',
        otpPlaceholder: '6 अंकों का OTP दर्ज करें',
        verifyOtp: 'OTP सत्यापित करें',
        verified: 'आधार सफलतापूर्वक सत्यापित!',
        continue: 'मूल्यांकन जारी रखें',
        resendOtp: 'OTP पुनः भेजें',
        otpSent: 'OTP भेजा गया आपके नंबर पर जो समाप्त होता है',
        demoDisclaimer:
          'यह एक प्रदर्शन प्रणाली है। वास्तविक आधार सत्यापन के लिए सरकारी API एकीकरण आवश्यक है।',
      },
      mr: {
        title: 'ओळख पडताळणी (आधार)',
        subtitle:
          "कृपया तुमचा आधार नंबर आणि फोन नंबर टाका जेणेकरून तुम्हाला OTP मिळेल. यशस्वी OTP पडताळणीनंतरच तुम्ही पुढे जाऊ शकता.",
        aadhaarLabel: 'आधार नंबर',
        aadhaarPlaceholder: '12 अंकी आधार नंबर टाका',
        phoneLabel: 'फोन नंबर',
        phonePlaceholder: 'फोन नंबर टाका (+91XXXXXXXXXX)',
        sendOtp: 'OTP पाठवा',
        otpLabel: 'OTP टाका',
        otpPlaceholder: '6 अंकी OTP टाका',
        verifyOtp: 'OTP पडताळणी करा',
        verified: 'आधार यशस्वीरित्या पडताळले!',
        continue: 'मूल्यांकन सुरू ठेवा',
        resendOtp: 'OTP पुन्हा पाठवा',
        otpSent: 'OTP पाठवला गेला तुमच्या नंबरवर जो संपतो',
        demoDisclaimer:
          'ही एक प्रात्यक्षिक प्रणाली आहे. खऱ्या आधार पडताळणीसाठी सरकारी API एकीकरण आवश्यक आहे.',
      },
    };
    return content[language as keyof typeof content] || content.en;
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {content.title}
            </h2>
            <p className="text-sm text-gray-600">{content.subtitle}</p>
          </div>

          {/* Demo Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Demo System:</strong> {content.demoDisclaimer}
            </p>
          </div>

          {step === 'captcha' && (
            <CaptchaVerification
              onVerificationComplete={handleCaptchaComplete}
            />
          )}

          {step === 'aadhaar' && (
            <form onSubmit={handleAadhaarSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.aadhaarLabel}
                </label>
                <input
                  type="text"
                  value={aadhaarNumber}
                  onChange={(e) =>
                    setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder={content.aadhaarPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.phoneLabel}
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder={content.phonePlaceholder}
                />
              </div>
              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading || aadhaarNumber.length !== 12}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Phone className="w-5 h-5" />
                    <span>{content.sendOtp}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  {content.otpSent} ****{phoneNumber.slice(-4)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.otpLabel}
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg tracking-widest"
                  placeholder={content.otpPlaceholder}
                />
              </div>
              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>{content.verifyOtp}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setStep('aadhaar')}
                className="w-full text-blue-600 hover:text-blue-800 text-sm underline"
              >
                {content.resendOtp}
              </button>
            </form>
          )}

          {step === 'verified' && (
            <div className="text-center space-y-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  {content.verified}
                </h3>
                <p className="text-sm text-gray-600">
                  You can now proceed with the credit assessment.
                </p>
              </div>
              <button
                onClick={() => onVerificationComplete(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                {content.continue}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AadhaarVerification;

