import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle } from 'lucide-react';

interface CaptchaVerificationProps {
  onVerificationComplete: (verified: boolean) => void;
}

const CaptchaVerification: React.FC<CaptchaVerificationProps> = ({ onVerificationComplete }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    setError('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    if (userInput.toUpperCase() === captchaText) {
      setIsVerified(true);
      setError('');
      onVerificationComplete(true);
    } else {
      setError('Incorrect CAPTCHA. Please try again.');
      generateCaptcha();
    }
  };

  if (isVerified) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Human Verification Complete!
          </h3>
          <p className="text-sm text-gray-600">
            You can now proceed with the assessment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Human Verification Required
        </h3>
        <p className="text-sm text-gray-600">
          Please enter the CAPTCHA code below to continue
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg text-center">
        <div className="bg-white p-4 rounded border-2 border-dashed border-gray-300 mb-4">
          <span className="text-2xl font-mono font-bold text-gray-800 tracking-wider select-none">
            {captchaText}
          </span>
        </div>
        <button
          onClick={generateCaptcha}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Generate New CAPTCHA</span>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter CAPTCHA Code
        </label>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-wider"
          placeholder="Enter the code above"
          maxLength={6}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      <button
        onClick={handleVerify}
        disabled={userInput.length !== 6}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium"
      >
        Verify Human
      </button>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-sm text-yellow-800">
          <strong>Demo Note:</strong> This is a demonstration CAPTCHA for human verification. 
          In production, this would be replaced with reCAPTCHA or similar service.
        </p>
      </div>
    </div>
  );
};

export default CaptchaVerification;