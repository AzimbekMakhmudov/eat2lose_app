'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/lib/api';
import { auth } from '@/lib/firebase';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    allergies: '',
    dislikes: '',
    goal: 'lose_weight',
  });
  const router = useRouter();

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateUserProfile(user.uid, {
        id: user.uid,
        email: user.email || '',
        name: formData.name,
        age: parseInt(formData.age),
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        allergies: formData.allergies.split(',').map(s => s.trim()).filter(Boolean),
        dislikes: formData.dislikes.split(',').map(s => s.trim()).filter(Boolean),
        hasCompletedOnboarding: true,
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Eat2Lose!</h1>
            <span className="text-sm text-gray-600">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="30"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="175"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="80"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dietary Preferences</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allergies (comma-separated)
              </label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => updateField('allergies', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="peanuts, shellfish"
              />
              <p className="text-sm text-gray-500 mt-1">Leave empty if none</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foods You Dislike (comma-separated)
              </label>
              <input
                type="text"
                value={formData.dislikes}
                onChange={(e) => updateField('dislikes', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="mushrooms, cilantro"
              />
              <p className="text-sm text-gray-500 mt-1">Leave empty if none</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Goal</h2>
            
            <div className="space-y-3">
              {[
                { value: 'lose_weight', label: 'Lose Weight', description: 'Reduce body weight and fat' },
                { value: 'maintain', label: 'Maintain Weight', description: 'Keep current weight stable' },
                { value: 'gain_muscle', label: 'Gain Muscle', description: 'Build lean muscle mass' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.goal === option.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="goal"
                    value={option.value}
                    checked={formData.goal === option.value}
                    onChange={(e) => updateField('goal', e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
          >
            {step === totalSteps ? 'Complete' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

