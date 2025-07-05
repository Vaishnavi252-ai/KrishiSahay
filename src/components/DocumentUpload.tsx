import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import sample712Data from '../data/sample712Data.json';
import type { Document712 } from '../types';
import type { FarmerData } from '../types';

interface DocumentUploadProps {
  onVerificationComplete: (verified: boolean, data?: FarmerData) => void;
  onBack: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onVerificationComplete, onBack }) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
    extractedData?: Document712[keyof Document712];
  } | null>(null);

  const getContent = () => {
    const content = {
      en: {
        title: "Upload 7/12 Document",
        subtitle: "Please upload your 7/12 land ownership document for verification",
        uploadBtn: "Choose File",
        verifyBtn: "Verify Document",
        dragDrop: "Drag and drop your 7/12 document here, or click to browse",
        supportedFormats: "Supported formats: JPG, PNG, PDF (Max 5MB)",
        preview: "Document Preview",
        verifying: "Verifying document...",
        verificationSuccess: "Document verified successfully!",
        verificationFailed: "Document verification failed. Please check your document and try again.",
        nameMatch: "Name matches with login credentials ✓",
        nameMismatch: "Name does not match with login credentials ✗",
        extractedData: "Extracted Information:",
        continue: "Continue to Assessment"
      },
      hi: {
        title: "7/12 दस्तावेज अपलोड करें",
        subtitle: "कृपया सत्यापन के लिए अपना 7/12 भूमि स्वामित्व दस्तावेज अपलोड करें",
        uploadBtn: "फ़ाइल चुनें",
        verifyBtn: "दस्तावेज सत्यापित करें",
        dragDrop: "अपना 7/12 दस्तावेज यहाँ खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें",
        supportedFormats: "समर्थित प्रारूप: JPG, PNG, PDF (अधिकतम 5MB)",
        preview: "दस्तावेज पूर्वावलोकन",
        verifying: "दस्तावेज सत्यापित कर रहे हैं...",
        verificationSuccess: "दस्तावेज सफलतापूर्वक सत्यापित!",
        verificationFailed: "दस्तावेज सत्यापन असफल। कृपया अपना दस्तावेज जांचें और पुनः प्रयास करें।",
        nameMatch: "नाम लॉगिन क्रेडेंशियल्स से मेल खाता है ✓",
        nameMismatch: "नाम लॉगिन क्रेडेंशियल्स से मेल नहीं खाता ✗",
        extractedData: "निकाली गई जानकारी:",
        continue: "मूल्यांकन जारी रखें"
      },
      mr: {
        title: "7/12 कागदपत्र अपलोड करा",
        subtitle: "कृपया सत्यापनासाठी तुमचे 7/12 जमीन मालकी कागदपत्र अपलोड करा",
        uploadBtn: "फाइल निवडा",
        verifyBtn: "कागदपत्र सत्यापित करा",
        dragDrop: "तुमचे 7/12 कागदपत्र येथे ड्रॅग आणि ड्रॉप करा, किंवा ब्राउझ करण्यासाठी क्लिक करा",
        supportedFormats: "समर्थित स्वरूप: JPG, PNG, PDF (कमाल 5MB)",
        preview: "कागदपत्र पूर्वावलोकन",
        verifying: "कागदपत्र सत्यापित करत आहे...",
        verificationSuccess: "कागदपत्र यशस्वीरित्या सत्यापित!",
        verificationFailed: "कागदपत्र सत्यापन अयशस्वी. कृपया तुमचे कागदपत्र तपासा आणि पुन्हा प्रयत्न करा.",
        nameMatch: "नाव लॉगिन क्रेडेंशियल्सशी जुळते ✓",
        nameMismatch: "नाव लॉगिन क्रेडेंशियल्सशी जुळत नाही ✗",
        extractedData: "काढलेली माहिती:",
        continue: "मूल्यांकन सुरू ठेवा"
      }
    };
    return content[language as keyof typeof content] || content.en;
  };

  const content = getContent();

  const handleFileUpload = (file: File) => {
  if (file.size > 5 * 1024 * 1024) {
    alert('File size should be less than 5MB');
    return;
  }

  setUploadedFile(file);

  // create a preview URL from the uploaded file
  const previewURL = URL.createObjectURL(file);
  setPreviewUrl(previewURL);

  setVerificationResult(null);
};

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const verifyDocument = async () => {
    if (!uploadedFile || !user) return;

    setIsVerifying(true);
    
    // Simulate OCR processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const data = sample712Data as Document712;
const languageData = data["english"]; // force English data

      const extractedName = languageData.name;
const loginName = user.name;

const nameMatches = extractedName.toLowerCase().split(" ").some(part =>
  loginName.toLowerCase().includes(part)
);


      if (nameMatches) {
        setVerificationResult({
          success: true,
          message: content.verificationSuccess,
          extractedData: languageData
        });

        // Map document data to FarmerData structure
        const farmerData: FarmerData = {
          personalInfo: {
            name: languageData.name,
            firstName: languageData.name.split(' ')[0] || '',
            middleName: languageData.name.split(' ')[1] || '',
            surname: languageData.name.split(' ')[2] || '',
            age: 0,
            phone: '',
            email: '',
            aadhaar: '',
            location: '',
            farmSize: Number(languageData.acres) || 0,
            experienceYears: 0,
            district: languageData.district,
            village: languageData.village,
          },
          farmingData: {
            // Assign to an appropriate property or leave empty if not available
            averageYield: Number(languageData.acres) || 0,
            cropTypes: [],
            lastThreeYearsYield: [],
            irrigationType: '',
            soilHealthScore: 0,
            weatherRiskManagement: 0,
            rainfallDependency: '',
            farmMechanization: false,
          },
          financialData: {
            seasonalIncome: 0,
            expensesPerMonth: 0,
            existingLoans: 0,
            requestedLoanAmount: 0,
            loanPurpose: '',
            previousLoansDefaulted: false,
            insuranceDetails: ''
          },
          communityData: {
            cooperativeMember: false,
            trainingPrograms: 0,
            governmentSchemes: [],
            peerRating: 0,
            referenceContacts: [],
          },
        };

        onVerificationComplete(true, farmerData);
      } else {
        setVerificationResult({
          success: false,
          message: content.verificationFailed,
          extractedData: languageData
        });
      }
    } catch {
      setVerificationResult({
        success: false,
        message: content.verificationFailed
      });
    } finally {
      setIsVerifying(false);
    }
  };

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
              <span>Back</span>
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h2>
            <p className="text-gray-600">{content.subtitle}</p>
          </div>

          <div className="p-6">
            {/* Upload Area */}
            {!uploadedFile && (
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">{content.dragDrop}</p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg cursor-pointer inline-block transition-colors"
                >
                  {content.uploadBtn}
                </label>
                <p className="text-sm text-gray-500 mt-4">{content.supportedFormats}</p>
              </div>
            )}

            {/* Preview and Verification */}
            {uploadedFile && (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      {/* Document Preview */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{content.preview}</h3>
        <div className="border border-gray-200 rounded-lg p-4">
          {previewUrl && (
  uploadedFile.type === "application/pdf" ? (
    <embed
      src={previewUrl}
      type="application/pdf"
      className="w-full h-64 rounded"
    />
  ) : (
    <img
      src={previewUrl}
      alt="Document preview"
      className="w-full h-64 object-contain rounded"
    />
  )
)}



          <div className="mt-4 text-sm text-gray-600">
            <p><strong>File:</strong> {uploadedFile.name}</p>
            <p><strong>Size:</strong> {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
      </div>


                  {/* Verification Results */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
                    
                    {!verificationResult && (
                      <div className="text-center">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Ready to verify document</p>
                        <button
                          onClick={verifyDocument}
                          disabled={isVerifying}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          {isVerifying ? content.verifying : content.verifyBtn}
                        </button>
                      </div>
                    )}

                    {verificationResult && (
                      <div className="space-y-4">
                        <div className={`flex items-center space-x-3 p-4 rounded-lg ${
                          verificationResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                        }`}>
                          {verificationResult.success ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <AlertCircle className="w-6 h-6" />
                          )}
                          <span className="font-medium">{verificationResult.message}</span>
                        </div>

                        {verificationResult.extractedData && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-3">{content.extractedData}</h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Name:</strong> {verificationResult.extractedData.name}</p>
                              <p><strong>Survey Number:</strong> {verificationResult.extractedData.survey_number}</p>
                              <p><strong>Village:</strong> {verificationResult.extractedData.village}</p>
                              <p><strong>District:</strong> {verificationResult.extractedData.district}</p>
                              <p><strong>Area:</strong> {verificationResult.extractedData.acres} acres</p>
                            </div>
                            
                            <div className={`mt-3 p-2 rounded text-sm ${
                              verificationResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {verificationResult.success ? content.nameMatch : content.nameMismatch}
                            </div>
                          </div>
                        )}

                        {verificationResult.success && (
                          <button
                            onClick={() => {
                              const data = verificationResult.extractedData;
                              if (data) {
                                const farmerData: FarmerData = {
                                  personalInfo: {
                                    name: data.name,
                                    firstName: data.name.split(' ')[0] || '',
                                    middleName: data.name.split(' ')[1] || '',
                                    surname: data.name.split(' ')[2] || '',
                                    age: 0,
                                    phone: '',
                                    email: '',
                                    aadhaar: '',
                                    location: '',
                                    farmSize: Number(data.acres) || 0,
                                    experienceYears: 0,
                                    district: data.district,
                                    village: data.village,
                                  },
                                  farmingData: {
                                    averageYield: Number(data.acres) || 0,
                                    cropTypes: [],
                                    lastThreeYearsYield: [],
                                    irrigationType: '',
                                    soilHealthScore: 0,
                                    weatherRiskManagement: 0,
                                    rainfallDependency: '',
                                    farmMechanization: false,
                                  },
                                  financialData: {
                                    seasonalIncome: 0,
                                    expensesPerMonth: 0,
                                    existingLoans: 0,
                                    requestedLoanAmount: 0,
                                    loanPurpose: '',
                                    previousLoansDefaulted: false,
                                    insuranceDetails: ''
                                  },
                                  communityData: {
                                    cooperativeMember: false,
                                    trainingPrograms: 0,
                                    governmentSchemes: [],
                                    peerRating: 0,
                                    referenceContacts: [],
                                  },
                                };
                                onVerificationComplete(true, farmerData);
                              }
                            }}
                            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                          >
                            {content.continue}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Demo Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Demo Note:</strong> This is a demonstration of document verification. 
                    In production, this would use real OCR technology and government database verification.
                    The system currently uses sample data for testing purposes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;