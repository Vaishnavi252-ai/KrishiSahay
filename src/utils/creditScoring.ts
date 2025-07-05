import type { FarmerData, CreditScore } from '../types';
import { getRecommendedLoanTerms } from './loanCalculator.ts';

export const calculateCreditScore = (data: FarmerData): CreditScore => {
  let score = 50; // Base score
  const factors = [];
  const explanation = [];
  const recommendations = [];

  // Personal Information Impact
  if (data.personalInfo.experienceYears >= 5) {
    score += 10;
    factors.push({
      name: 'Farming Experience',
      impact: 10,
      value: `${data.personalInfo.experienceYears} years of experience`
    });
    explanation.push('Good farming experience shows stability and knowledge.');
  } else {
    score -= 5;
    factors.push({
      name: 'Farming Experience',
      impact: -5,
      value: `${data.personalInfo.experienceYears} years of experience`
    });
    recommendations.push('Consider gaining more experience or taking agricultural training programs.');
  }

  if (data.personalInfo.farmSize >= 2) {
    score += 8;
    factors.push({
      name: 'Farm Size',
      impact: 8,
      value: `${data.personalInfo.farmSize} acres`
    });
    explanation.push('Adequate farm size indicates good production capacity.');
  } else {
    score -= 3;
    factors.push({
      name: 'Farm Size',
      impact: -3,
      value: `${data.personalInfo.farmSize} acres`
    });
    recommendations.push('Consider expanding farm size or intensive farming techniques.');
  }

  // Farming Data Impact
  if (data.farmingData.averageYield >= 3) {
    score += 15;
    factors.push({
      name: 'Yield Performance',
      impact: 15,
      value: `${data.farmingData.averageYield} tons/acre`
    });
    explanation.push('High yield indicates good farming practices and productivity.');
  } else if (data.farmingData.averageYield >= 1.5) {
    score += 5;
    factors.push({
      name: 'Yield Performance',
      impact: 5,
      value: `${data.farmingData.averageYield} tons/acre`
    });
  } else {
    score -= 10;
    factors.push({
      name: 'Yield Performance',
      impact: -10,
      value: `${data.farmingData.averageYield} tons/acre`
    });
    recommendations.push('Focus on improving yield through better seeds, fertilizers, and farming techniques.');
  }

  if (data.farmingData.soilHealthScore >= 7) {
    score += 10;
    factors.push({
      name: 'Soil Health',
      impact: 10,
      value: `Score: ${data.farmingData.soilHealthScore}/10`
    });
    explanation.push('Good soil health ensures sustainable farming and consistent yields.');
  } else if (data.farmingData.soilHealthScore <= 4) {
    score -= 8;
    factors.push({
      name: 'Soil Health',
      impact: -8,
      value: `Score: ${data.farmingData.soilHealthScore}/10`
    });
    recommendations.push('Invest in soil improvement through organic matter and proper fertilization.');
  }

  if (data.farmingData.irrigationType === 'drip' || data.farmingData.irrigationType === 'sprinkler') {
    score += 8;
    factors.push({
      name: 'Irrigation Efficiency',
      impact: 8,
      value: `${data.farmingData.irrigationType} irrigation`
    });
    explanation.push('Efficient irrigation methods show modern farming practices.');
  } else if (data.farmingData.irrigationType === 'rainfed') {
    score -= 5;
    factors.push({
      name: 'Irrigation Risk',
      impact: -5,
      value: 'Rainfed farming'
    });
    recommendations.push('Consider investing in irrigation infrastructure to reduce weather dependency.');
  }

  // Rainfall dependency impact
  if (data.farmingData.rainfallDependency === 'rainfed') {
    score -= 8;
    factors.push({
      name: 'Weather Dependency',
      impact: -8,
      value: 'High rainfall dependency'
    });
    recommendations.push('Implement water conservation and irrigation systems to reduce weather risks.');
  }

  // Farm mechanization impact
  if (data.farmingData.farmMechanization) {
    score += 6;
    factors.push({
      name: 'Farm Mechanization',
      impact: 6,
      value: 'Uses modern equipment'
    });
    explanation.push('Farm mechanization improves efficiency and productivity.');
  }

  // Financial Data Impact
  const seasonalIncome = data.financialData.seasonalIncome;
  const monthlyExpenses = data.financialData.expensesPerMonth;
  const netIncome = seasonalIncome - (monthlyExpenses * 12);
  const requestedAmount = data.financialData.requestedLoanAmount;

  if (netIncome > 0 && (requestedAmount / (seasonalIncome / 12)) <= 24) {
    score += 12;
    factors.push({
      name: 'Repayment Capacity',
      impact: 12,
      value: `Net annual income: ₹${netIncome.toLocaleString()}`
    });
    explanation.push('Strong repayment capacity based on income vs. expenses.');
  } else if (netIncome <= 0) {
    score -= 15;
    factors.push({
      name: 'Repayment Capacity',
      impact: -15,
      value: `Negative cash flow: ₹${netIncome.toLocaleString()}`
    });
    recommendations.push('Focus on reducing expenses or increasing income before taking loans.');
  }

  if (data.financialData.existingLoans < seasonalIncome * 0.5) {
    score += 5;
    factors.push({
      name: 'Existing Debt',
      impact: 5,
      value: `Manageable debt level: ₹${data.financialData.existingLoans.toLocaleString()}`
    });
  } else {
    score -= 10;
    factors.push({
      name: 'Existing Debt',
      impact: -10,
      value: `High debt burden: ₹${(data.financialData.seasonalIncome ?? 0).toLocaleString()}`

    });
    recommendations.push('Consider reducing existing debt before applying for new loans.');
  }

  // Previous loan defaults impact
  if (data.financialData.previousLoansDefaulted) {
    score -= 20;
    factors.push({
      name: 'Credit History',
      impact: -20,
      value: 'Previous loan defaults'
    });
    recommendations.push('Work on rebuilding credit history through timely payments.');
  }

  // Community Data Impact
  if (data.communityData.cooperativeMember) {
    score += 7;
    factors.push({
      name: 'Community Engagement',
      impact: 7,
      value: 'Cooperative member'
    });
    explanation.push('Cooperative membership shows community trust and support.');
  }

  if (data.communityData.trainingPrograms >= 3) {
    score += 6;
    factors.push({
      name: 'Training & Education',
      impact: 6,
      value: `${data.communityData.trainingPrograms} programs attended`
    });
    explanation.push('Regular training participation shows commitment to improvement.');
  } else if (data.communityData.trainingPrograms === 0) {
    recommendations.push('Attend agricultural training programs to improve farming techniques.');
  }

  if (data.communityData.peerRating >= 8) {
    score += 8;
    factors.push({
      name: 'Community Reputation',
      impact: 8,
      value: `Peer rating: ${data.communityData.peerRating}/10`
    });
    explanation.push('High community rating indicates trustworthiness and reliability.');
  } else if (data.communityData.peerRating <= 5) {
    score -= 5;
    factors.push({
      name: 'Community Reputation',
      impact: -5,
      value: `Peer rating: ${data.communityData.peerRating}/10`
    });
    recommendations.push('Work on building better relationships within the farming community.');
  }

  // Land type impact (lease vs owned)
  if (data.landData?.landType === 'lease') {
    score -= 10;
    factors.push({
      name: 'Land Ownership',
      impact: -10,
      value: 'Lease land (higher risk)'
    });
    recommendations.push('Consider purchasing land for better loan terms in the future.');
    
    // Additional checks for lease land
    if (data.landData.leasePeriod && data.landData.leasePeriod < 3) {
      score -= 5;
      recommendations.push('Secure longer lease agreements for better creditworthiness.');
    }
  }

  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, score));

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high';
  if (score >= 70) {
    riskLevel = 'low';
  } else if (score >= 50) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'high';
  }

  // Calculate loan eligibility and terms
  const monthlyIncome = seasonalIncome / 12;
  const loanTerms = getRecommendedLoanTerms(score, requestedAmount, monthlyIncome);

  // Add general recommendations
  if (score < 70) {
    recommendations.push('Consider starting with a smaller loan amount to build credit history.');
  }
  if (riskLevel === 'high') {
    recommendations.push('Focus on improving key factors before reapplying for a larger loan.');
  }

  return {
    score,
    riskLevel,
    explanation,
    recommendations,
    factors: factors.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)).slice(0, 6),
    loanEligibility: loanTerms
  };
};
