'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { fetchTodayMealPlan, DayPlan } from '@/lib/api';
import Topbar from '@/components/Topbar';
import MealCard from '@/components/MealCard';
import StatsCard from '@/components/StatsCard';
import { Flame, Activity, TrendingDown, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function DashboardPage() {
  const [todayPlan, setTodayPlan] = useState<DayPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const plan = await fetchTodayMealPlan(user.uid);
        setTodayPlan(plan);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div>
        <Topbar title="Dashboard" />
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Topbar title="Dashboard" />
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg text-gray-600">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </h3>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}!
          </h2>
        </div>

        {todayPlan && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Calories"
                value={todayPlan.totalCalories}
                subtitle="kcal today"
                icon={Flame}
                color="orange"
              />
              <StatsCard
                title="Protein"
                value={`${todayPlan.totalProtein}g`}
                subtitle="of your daily goal"
                icon={Activity}
                color="blue"
              />
              <StatsCard
                title="Carbs"
                value={`${todayPlan.totalCarbs}g`}
                subtitle="of your daily goal"
                icon={TrendingDown}
                color="green"
              />
              <StatsCard
                title="Fats"
                value={`${todayPlan.totalFats}g`}
                subtitle="of your daily goal"
                icon={Calendar}
                color="purple"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Meals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {todayPlan.meals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

