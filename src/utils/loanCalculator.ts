export interface LoanCalculation {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  recommendedPeriod: number;
}

export const calculateLoanEMI = (
  principal: number,
  annualRate: number,
  tenureMonths: number
): LoanCalculation => {
  const monthlyRate = annualRate / 12 / 100;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  
  const totalAmount = emi * tenureMonths;
  const totalInterest = totalAmount - principal;
  
  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
    monthlyPayment: Math.round(emi),
    recommendedPeriod: tenureMonths
  };
};

export const getRecommendedLoanTerms = (
  creditScore: number,
  requestedAmount: number,
  monthlyIncome: number
): {
  eligible: boolean;
  maxAmount: number;
  recommendedPeriod: number;
  interestRate: number;
  emi: number;
} => {
  let eligible = false;
  let maxAmount = 0;
  let interestRate = 12; // Default high rate
  let recommendedPeriod = 12; // 1 year default

  if (creditScore >= 70) {
    eligible = true;
    maxAmount = Math.min(requestedAmount, monthlyIncome * 36); // 3 years of income
    interestRate = 7; // Best rate
    recommendedPeriod = 24; // 2 years
  } else if (creditScore >= 50) {
    eligible = true;
    maxAmount = Math.min(requestedAmount * 0.7, monthlyIncome * 18); // 1.5 years of income
    interestRate = 9; // Medium rate
    recommendedPeriod = 18; // 1.5 years
  } else if (creditScore >= 30) {
    eligible = true;
    maxAmount = Math.min(requestedAmount * 0.4, monthlyIncome * 12); // 1 year of income
    interestRate = 12; // High rate
    recommendedPeriod = 12; // 1 year
  }

  const loanCalc = calculateLoanEMI(maxAmount, interestRate, recommendedPeriod);

  return {
    eligible,
    maxAmount,
    recommendedPeriod,
    interestRate,
    emi: loanCalc.emi
  };
};