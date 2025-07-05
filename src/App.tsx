import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import LandOptionsPage from './components/LandOptionsPage';
import DocumentUpload from './components/DocumentUpload';
import EnhancedAssessmentForm from './components/EnhancedAssessmentForm';
import CreditScoreResults from './components/CreditScoreResults';
import FarmingImprovements from './components/FarmingImprovement';
import AboutUs from './components/AboutUs';
import HowToUse from './components/HowToUse';
import Chatbot from './components/Chatbot';
import Header from './components/Header';
import type { FarmerData, CreditScore } from './types';
import { calculateCreditScore } from './utils/creditScoring';

type AppState = 'login' | 'landOptions' | 'documentUpload' | 'assessment' | 'results' | 'improvements' | 'about' | 'howto';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentState, setCurrentState] = useState<AppState>('login');
  const [creditScore, setCreditScore] = useState<CreditScore | null>(null);
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
  const [landType, setLandType] = useState<'owned' | 'lease'>('owned');
  const [extractedData, setExtractedData] = useState<FarmerData | undefined>(undefined);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && currentState !== 'login') {
      setCurrentState('login');
    }
  }, [isAuthenticated, currentState]);

  const handleLoginSuccess = () => {
    setCurrentState('landOptions');
  };

  const handleLandOptionSelect = (option: 'owned' | 'lease') => {
    setLandType(option);
    if (option === 'owned') {
      setCurrentState('documentUpload');
    } else {
      setCurrentState('assessment');
    }
  };

  const handleDocumentVerification = (verified: boolean, data?: FarmerData) => {
    if (verified) {
      setExtractedData(data ?? undefined);
      setCurrentState('assessment');
    }
  };

  const handleAssessmentSubmit = (data: FarmerData) => {
    setFarmerData(data);
    const score = calculateCreditScore(data);
    setCreditScore(score);
    setCurrentState('results');
  };

  const handleBackToLandOptions = () => {
    setCurrentState('landOptions');
    setExtractedData(undefined);
  };

  const handleBackToHome = () => {
    setCurrentState('landOptions');
    setCreditScore(null);
    setFarmerData(null);
    setExtractedData(undefined);
  };

  const handleViewImprovements = () => {
    setCurrentState('improvements');
  };

  const handleBackToResults = () => {
    setCurrentState('results');
  };

  const handleShowAbout = () => {
    setCurrentState('about');
  };

  const handleShowHowTo = () => {
    setCurrentState('howto');
  };

  // Show navigation links only on appropriate pages
  const showNavLinks = ['landOptions', 'about', 'howto'].includes(currentState);

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {showNavLinks && (
        <Header 
          onShowAbout={handleShowAbout}
          onShowHowTo={handleShowHowTo}
        />
      )}
      
      {currentState === 'landOptions' && (
        <LandOptionsPage onSelectOption={handleLandOptionSelect} />
      )}
      
      {currentState === 'documentUpload' && (
        <DocumentUpload 
          onVerificationComplete={handleDocumentVerification}
          onBack={handleBackToLandOptions}
        />
      )}
      
      {currentState === 'assessment' && (
        <EnhancedAssessmentForm
          onSubmit={handleAssessmentSubmit}
          onBack={handleBackToLandOptions}
          landType={landType}
          extractedData={
            extractedData
              ? {
                  survey_number: extractedData.landData?.surveyNumber !== undefined
                    ? String(extractedData.landData?.surveyNumber)
                    : undefined,
                  village: extractedData.landData?.village,
                  district: extractedData.landData?.district,
                  acres: extractedData.landData?.acres,
                }
              : undefined
          }
        />
      )}
      
      {currentState === 'results' && creditScore && farmerData && (
        <CreditScoreResults
          creditScore={creditScore}
          onBack={handleBackToHome}
          onViewImprovements={handleViewImprovements}
          farmerName={farmerData.personalInfo.name}
        />
      )}
      
      {currentState === 'improvements' && creditScore && farmerData && (
        <FarmingImprovements
          creditScore={creditScore}
          onBack={handleBackToResults}
          farmerName={farmerData.personalInfo.name}
        />
      )}
      
      {currentState === 'about' && (
        <AboutUs onBack={handleBackToHome} />
      )}
      
      {currentState === 'howto' && (
        <HowToUse onBack={handleBackToHome} />
      )}

      {/* Floating Chatbot - Available on all pages except login */}
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;      
