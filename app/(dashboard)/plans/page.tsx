'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { fetchWeekPlan, fetchMonthPlan, DayPlan } from '@/lib/api';
import Topbar from '@/components/Topbar';
import { format, parseISO } from 'date-fns';
import { Calendar } from 'lucide-react';

export default function PlansPage() {
  const [view, setView] = useState<'week' | 'month'>('week');
  const [plans, setPlans] = useState<DayPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        setLoading(true);
        const data = view === 'week' 
          ? await fetchWeekPlan(user.uid)
          : await fetchMonthPlan(user.uid);
        setPlans(data);
      } catch (error) {
        console.error('Error loading plans:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [view]);

  return (
    <div>
      <Topbar title="Meal Plans" />
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Your Meal Plans</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'week'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'month'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan.date}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-primary-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {format(parseISO(plan.date), 'EEEE, MMMM d')}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {plan.meals?.length || 3} meals planned
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-8">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(plan.totalCalories)}
                      </p>
                      <p className="text-xs text-gray-600">Calories</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(plan.totalProtein)}g
                      </p>
                      <p className="text-xs text-gray-600">Protein</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(plan.totalCarbs)}g
                      </p>
                      <p className="text-xs text-gray-600">Carbs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(plan.totalFats)}g
                      </p>
                      <p className="text-xs text-gray-600">Fats</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

