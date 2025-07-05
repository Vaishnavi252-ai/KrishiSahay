export interface FarmerData {
  id?: string;
  personalInfo: {
  name: string;
  firstName: string;
  middleName: string;
  surname: string;
  age: number;
  phone: string;
  email: string;
  aadhaar: string;
  location: string;
  farmSize: number;
  experienceYears: number;
  district: string; // Added property
  village: string;  // Added property
};
  farmingData: {
    cropTypes: string[];
    averageYield: number;
    lastThreeYearsYield: number[];
    irrigationType: string;
    soilHealthScore: number;
    weatherRiskManagement: number;
    rainfallDependency: string;
    farmMechanization: boolean;
  };
  financialData: {
    seasonalIncome: number;
    expensesPerMonth: number;
    existingLoans: number;
    requestedLoanAmount: number;
    loanPurpose: string;
    previousLoansDefaulted: boolean;
    insuranceDetails: string;
  };
  communityData: {
    cooperativeMember: boolean;
    trainingPrograms: number;
    governmentSchemes: string[];
    peerRating: number;
    referenceContacts: Array<{
      name: string;
      phone: string;
    }>;
  };
  landData?: {
    surveyNumber: number;
    village: string;
    district: string;
    acres: string;
    landType: 'owned' | 'lease';
    leaseAgreementId?: string;
    leasePeriod?: number;
    leaseType?: 'private' | 'government';
  };
}

export interface CreditScore {
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  explanation: string[];
  recommendations: string[];
  factors: {
    name: string;
    impact: number;
    value: string;
  }[];
  loanEligibility: {
    eligible: boolean;
    maxAmount: number;
    recommendedPeriod: number;
    emi: number;
    interestRate: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  language: 'en' | 'hi' | 'mr';
  isVerified: boolean;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface Document712 {
  marathi: {
    name: string;
    survey_number: string;
    village: string;
    district: string;
    acres: string;
  };
  hindi: {
    name: string;
    survey_number: string;
    village: string;
    district: string;
    acres: string;
  };
  english: {
    name: string;
    survey_number: string;
    village: string;
    district: string;
    acres: string;
  };
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
