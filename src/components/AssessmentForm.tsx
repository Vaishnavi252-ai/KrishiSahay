import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight, CheckCircle, User, Wheat, DollarSign, Users as UsersIcon } from 'lucide-react';
import type { FarmerData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AssessmentFormProps {
  onSubmit: (data: FarmerData) => void;
  onBack: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit, onBack }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm<FarmerData>();

  const steps = [
    { title: t('personalInfo'), icon: User },
    { title: t('farmingData'), icon: Wheat },
    { title: t('financialData'), icon: DollarSign },
    { title: t('communityData'), icon: UsersIcon }
  ];

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
    onSubmit(data);
  };

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
              <span>{t('backToHome')}</span>
            </button>

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
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="p-6">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('fullName')}
                    </label>
                    <input
                      type="text"
                      {...register('personalInfo.name', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {errors.personalInfo?.name && (
                      <p className="text-red-500 text-sm mt-1">This field is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('age')}
                    </label>
                    <input
                      type="number"
                      {...register('personalInfo.age', { required: true, min: 18, max: 80 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your age"
                    />
                    {errors.personalInfo?.age && (
                      <p className="text-red-500 text-sm mt-1">Age must be between 18 and 80</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      {...register('personalInfo.phone', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                    {errors.personalInfo?.phone && (
                      <p className="text-red-500 text-sm mt-1">This field is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('location')}
                    </label>
                    <input
                      type="text"
                      {...register('personalInfo.location', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your village/location"
                    />
                    {errors.personalInfo?.location && (
                      <p className="text-red-500 text-sm mt-1">This field is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('farmSize')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      {...register('personalInfo.farmSize', { required: true, min: 0.1 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter farm size in acres"
                    />
                    {errors.personalInfo?.farmSize && (
                      <p className="text-red-500 text-sm mt-1">Farm size must be at least 0.1 acres</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('experienceYears')}
                    </label>
                    <input
                      type="number"
                      {...register('personalInfo.experienceYears', { required: true, min: 1 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Years of farming experience"
                    />
                    {errors.personalInfo?.experienceYears && (
                      <p className="text-red-500 text-sm mt-1">Experience must be at least 1 year</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('cropTypes')}
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
                        <span className="text-sm text-gray-700">{t(crop)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('averageYield')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      {...register('farmingData.averageYield', { required: true, min: 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Average yield in tons per acre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('irrigationType')}
                    </label>
                    <select
                      {...register('farmingData.irrigationType', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select irrigation type</option>
                      <option value="drip">{t('drip')}</option>
                      <option value="sprinkler">{t('sprinkler')}</option>
                      <option value="flood">{t('flood')}</option>
                      <option value="rainfed">{t('rainfed')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('soilHealthScore')}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      {...register('farmingData.soilHealthScore', { required: true, min: 1, max: 10 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Rate soil health from 1-10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('weatherRiskManagement')}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      {...register('farmingData.weatherRiskManagement', { required: true, min: 1, max: 10 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Rate weather risk management from 1-10"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('monthlyIncome')}
                    </label>
                    <input
                      type="number"
                      {...register('financialData.seasonalIncome', { required: true, min: 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Monthly income in ₹"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('expensesPerMonth')}
                    </label>
                    <input
                      type="number"
                      {...register('financialData.expensesPerMonth', { required: true, min: 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Monthly expenses in ₹"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('existingLoans')}
                    </label>
                    <input
                      type="number"
                      {...register('financialData.existingLoans', { required: true, min: 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Existing loan amount in ₹"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('requestedLoanAmount')}
                    </label>
                    <input
                      type="number"
                      {...register('financialData.requestedLoanAmount', { required: true, min: 1000 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Requested loan amount in ₹"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('loanPurpose')}
                    </label>
                    <select
                      {...register('financialData.loanPurpose', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select loan purpose</option>
                      <option value="equipment">{t('equipment')}</option>
                      <option value="seeds">{t('seeds')}</option>
                      <option value="landImprovement">{t('landImprovement')}</option>
                      <option value="livestock">{t('livestock')}</option>
                      <option value="other">{t('other')}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('cooperativeMember')}
                    </label>
                    <select
                      {...register('communityData.cooperativeMember', { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="true">{t('yes')}</option>
                      <option value="false">{t('no')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('trainingPrograms')}
                    </label>
                    <input
                      type="number"
                      {...register('communityData.trainingPrograms', { required: true, min: 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Number of training programs attended"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('peerRating')}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      {...register('communityData.peerRating', { required: true, min: 1, max: 10 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Community rating from 1-10"
                    />
                  </div>
                </div>
              </div>
            )}

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
                <span>{t('previous')}</span>
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                >
                  <span>{t('next')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                >
                  <span>{t('submit')}</span>
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

export default AssessmentForm;