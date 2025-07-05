import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight, CheckCircle, User, Wheat, DollarSign, Users as UsersIcon, Shield, AlertCircle } from 'lucide-react';
import type { FarmerData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface EnhancedAssessmentFormProps {
  onSubmit: (data: FarmerData) => void;
  onBack: () => void;
  landType: 'owned' | 'lease';
  extractedData?: {
    survey_number?: string;
    village?: string;
    district?: string;
    acres?: string | number;
  };
}

const EnhancedAssessmentForm: React.FC<EnhancedAssessmentFormProps> = ({ 
  onSubmit, 
  onBack, 
  landType,
  extractedData 
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpError, setOtpError] = useState('');
  
  const { register, handleSubmit, watch, setValue } = useForm<FarmerData>();

  const steps = [
    { title: 'Personal Information', icon: User },
    { title: 'Farming Data', icon: Wheat },
    { title: 'Financial Data', icon: DollarSign },
    { title: 'Community Data', icon: UsersIcon },
    { title: 'Verification', icon: Shield }
  ];

  // Pre-fill form with extracted data and user info
  useEffect(() => {
    if (user) {
      setValue('personalInfo.name', user.name);
      setValue('personalInfo.email', user.email);
      setValue('personalInfo.phone', user.phone);
    }
    
    if (extractedData) {
      setValue('landData.surveyNumber', extractedData.survey_number !== undefined ? Number(extractedData.survey_number) : 0);
      setValue('landData.village', extractedData.village ?? '');
      setValue('landData.district', extractedData.district ?? '');
      setValue('landData.acres', extractedData.acres !== undefined ? String(extractedData.acres) : '');
      setValue('personalInfo.farmSize', extractedData.acres ? parseFloat(extractedData.acres as string) : 0);
    }
    
    setValue('landData.landType', landType);
  }, [user, extractedData, landType, setValue]);

  const handleAadhaarVerification = () => {
    const aadhaarNumber = watch('personalInfo.aadhaar');
    if (aadhaarNumber && aadhaarNumber.length === 12) {
      setShowOtpInput(true);
      // Simulate sending OTP
      setTimeout(() => {
        alert(`Demo OTP sent to ${user?.phone}: 123456`);
      }, 500);
    }
  };

  const verifyOtp = () => {
    if (otp === '123456') {
      setAadhaarVerified(true);
      setShowOtpInput(false);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP. Use 123456 for demo.');
    }
  };

  const validateNameConsistency = () => {
  const firstName = watch('personalInfo.firstName')?.toLowerCase() || "";
  const middleName = watch('personalInfo.middleName')?.toLowerCase() || "";
  const surname = watch('personalInfo.surname')?.toLowerCase() || "";

  const loginName = user?.name?.toLowerCase() || "";

  const fullName = `${firstName} ${middleName} ${surname}`.replace(/\s+/g, ' ').trim();
  const firstAndSurname = `${firstName} ${surname}`.replace(/\s+/g, ' ').trim();

  return (
    loginName.includes(fullName) || loginName.includes(firstAndSurname)
  );
};



  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onFormSubmit = (data: FarmerData) => {
    if (!aadhaarVerified) {
      alert('Please verify your Aadhaar number first.');
      return;
    }
    
    if (!validateNameConsistency()) {
      alert('Name entered does not match with login credentials.');
      return;
    }
    
    onSubmit(data);
  };

  const getContent = () => {
    const content = {
      en: {
        personalInfo: "Personal Information",
        farmingData: "Farming Information", 
        financialData: "Financial Information",
        communityData: "Community Information",
        verification: "Verification",
        firstName: "First Name",
        middleName: "Middle Name",
        surname: "Surname",
        aadhaar: "Aadhaar Number",
        verifyAadhaar: "Verify Aadhaar",
        enterOtp: "Enter OTP",
        verifyOtp: "Verify OTP",
        aadhaarVerified: "Aadhaar Verified ✓",
        seasonalIncome: "Seasonal/Annual Income (₹)",
        rainfallDependency: "Rainfall Dependency",
        farmMechanization: "Farm Mechanization",
        previousLoansDefaulted: "Previous Loans Defaulted",
        insuranceDetails: "Insurance Details",
        referenceContacts: "Reference Contacts",
        leaseAgreementId: "Lease Agreement ID",
        leasePeriod: "Lease Period (Years)",
        leaseType: "Lease Type"
      },
      hi: {
        personalInfo: "व्यक्तिगत जानकारी",
        farmingData: "कृषि जानकारी",
        financialData: "वित्तीय जानकारी", 
        communityData: "सामुदायिक जानकारी",
        verification: "सत्यापन",
        firstName: "पहला नाम",
        middleName: "मध्य नाम",
        surname: "उपनाम",
        aadhaar: "आधार नंबर",
        verifyAadhaar: "आधार सत्यापित करें",
        enterOtp: "OTP दर्ज करें",
        verifyOtp: "OTP सत्यापित करें",
        aadhaarVerified: "आधार सत्यापित ✓",
        seasonalIncome: "मौसमी/वार्षिक आय (₹)",
        rainfallDependency: "वर्षा निर्भरता",
        farmMechanization: "कृषि यंत्रीकरण",
        previousLoansDefaulted: "पिछले ऋण चूक",
        insuranceDetails: "बीमा विवरण",
        referenceContacts: "संदर्भ संपर्क",
        leaseAgreementId: "पट्टा समझौता ID",
        leasePeriod: "पट्टा अवधि (वर्ष)",
        leaseType: "पट्टा प्रकार"
      },
      mr: {
        personalInfo: "वैयक्तिक माहिती",
        farmingData: "शेतकी माहिती",
        financialData: "आर्थिक माहिती",
        communityData: "सामुदायिक माहिती", 
        verification: "सत्यापन",
        firstName: "पहिले नाव",
        middleName: "मधले नाव",
        surname: "आडनाव",
        aadhaar: "आधार नंबर",
        verifyAadhaar: "आधार सत्यापित करा",
        enterOtp: "OTP टाका",
        verifyOtp: "OTP सत्यापित करा",
        aadhaarVerified: "आधार सत्यापित ✓",
        seasonalIncome: "हंगामी/वार्षिक उत्पन्न (₹)",
        rainfallDependency: "पावसावर अवलंबित्व",
        farmMechanization: "शेत यंत्रीकरण",
        previousLoansDefaulted: "मागील कर्ज चूक",
        insuranceDetails: "विमा तपशील",
        referenceContacts: "संदर्भ संपर्क",
        leaseAgreementId: "भाडेपट्टा करार ID",
        leasePeriod: "भाडेपट्टा कालावधी (वर्षे)",
        leaseType: "भाडेपट्टा प्रकार"
      }
    };
    return content[language as keyof typeof content] || content.en;
  };

  const content: { [key: string]: string } = getContent();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            {/* Progress Steps */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      index <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 mx-2 ${
                        index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep].title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                Step {currentStep + 1} of {steps.length} - {landType === 'lease' ? 'Lease Land Assessment' : 'Land Owner Assessment'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="p-6">
            {/* Step 0: Personal Information */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.firstName} *
                    </label>
                    <input
                      type="text"
                      {...register('personalInfo.firstName', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.middleName}
                    </label>
                    <input
                      type="text"
                      {...register('personalInfo.middleName')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.surname} *
                    </label>
                    <input
                      type="text"
                      {...register('personalInfo.surname', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      {...register('personalInfo.age', { required: true, min: 18, max: 80 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Years *
                    </label>
                    <input
                      type="number"
                      {...register('personalInfo.experienceYears', { required: true, min: 1 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Aadhaar Verification */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content.aadhaar} *
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      {...register('personalInfo.aadhaar', { 
                        required: true, 
                        pattern: /^\d{12}$/
                      })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter 12-digit Aadhaar number"
                      maxLength={12}
                    />
                    {!aadhaarVerified && (
                      <button
                        type="button"
                        onClick={handleAadhaarVerification}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg"
                      >
                        {content.verifyAadhaar}
                      </button>
                    )}
                    {aadhaarVerified && (
                      <div className="flex items-center text-green-600 px-4">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {content.aadhaarVerified}
                      </div>
                    )}
                  </div>

                  {showOtpInput && (
                    <div className="mt-4 space-y-3">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                        />
                        <button
                          type="button"
                          onClick={verifyOtp}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg"
                        >
                          {content.verifyOtp}
                        </button>
                      </div>
                      {otpError && (
                        <p className="text-red-600 text-sm">{otpError}</p>
                      )}
                      <p className="text-blue-600 text-sm">Demo OTP: 123456</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 1: Farming Data */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Yield (tons/acre) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      {...register('farmingData.averageYield', { required: true, min: 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Irrigation Type *
                    </label>
                    <select
                      {...register('farmingData.irrigationType', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select irrigation type</option>
                      <option value="drip">Drip Irrigation</option>
                      <option value="sprinkler">Sprinkler</option>
                      <option value="flood">Flood Irrigation</option>
                      <option value="rainfed">Rainfed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.rainfallDependency} *
                    </label>
                    <select
                      {...register('farmingData.rainfallDependency', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select dependency</option>
                      <option value="rainfed">Rainfed</option>
                      <option value="irrigated">Irrigated</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.farmMechanization}
                    </label>
                    <select
                      {...register('farmingData.farmMechanization')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>

                {/* Crop Types */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Types *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['rice', 'wheat', 'sugarcane', 'cotton', 'vegetables', 'fruits'].map((crop) => (
                      <label key={crop} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value={crop}
                          {...register('farmingData.cropTypes')}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{crop}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Financial Data */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.seasonalIncome} *
                    </label>
                    <input
                      type="number"
                      {...register('financialData.seasonalIncome', { required: true, min: 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Annual/seasonal income"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Expenses (₹) *
                    </label>
                    <input
                      type="number"
                      {...register('financialData.expensesPerMonth', { required: true, min: 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requested Loan Amount (₹) *
                    </label>
                    <input
                      type="number"
                      {...register('financialData.requestedLoanAmount', { required: true, min: 1000 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {content.previousLoansDefaulted}
                    </label>
                    <select
                      {...register('financialData.previousLoansDefaulted')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>

                {landType === 'lease' && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">Lease Land Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {content.leaseAgreementId} *
                        </label>
                        <input
                          type="text"
                          {...register('landData.leaseAgreementId', { required: landType === 'lease' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {content.leasePeriod} *
                        </label>
                        <input
                          type="number"
                          {...register('landData.leasePeriod', { required: landType === 'lease', min: 1 })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Community Data */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cooperative Member
                    </label>
                    <select
                      {...register('communityData.cooperativeMember')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Training Programs Attended
                    </label>
                    <input
                      type="number"
                      {...register('communityData.trainingPrograms', { min: 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {landType === 'lease' && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">{content.referenceContacts}</h3>
                    <div className="space-y-4">
                      {[0, 1].map((index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Reference {index + 1} Name *
                            </label>
                            <input
                              type="text"
                              {...register(`communityData.referenceContacts.${index}.name`, { 
                                required: landType === 'lease' 
                              })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Reference {index + 1} Phone *
                            </label>
                            <input
                              type="tel"
                              {...register(`communityData.referenceContacts.${index}.phone`, { 
                                required: landType === 'lease' 
                              })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Verification Summary */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Verification Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      {aadhaarVerified ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className={aadhaarVerified ? 'text-green-800' : 'text-red-800'}>
                        Aadhaar Verification: {aadhaarVerified ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {validateNameConsistency() ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className={validateNameConsistency() ? 'text-green-800' : 'text-red-800'}>
                        Name Consistency: {validateNameConsistency() ? 'Verified' : 'Mismatch'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800">
                        Land Type: {landType === 'owned' ? 'Owned Land' : 'Lease Land'}
                      </span>
                    </div>
                  </div>
                </div>

                {(!aadhaarVerified || !validateNameConsistency()) && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-800 text-sm">
                      Please complete all verifications before submitting the assessment.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!aadhaarVerified || !validateNameConsistency()}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg"
                >
                  <span>Submit Assessment</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAssessmentForm;