'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Meal } from '@/lib/api';

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  const mealTypeColors = {
    breakfast: 'bg-yellow-100 text-yellow-800',
    lunch: 'bg-blue-100 text-blue-800',
    dinner: 'bg-purple-100 text-purple-800',
    snack: 'bg-green-100 text-green-800',
  };

  return (
    <Link href={`/recipes/${meal.recipeId}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        {meal.imageUrl && (
          <div className="relative h-48 w-full">
            <Image
              src={meal.imageUrl}
              alt={meal.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${mealTypeColors[meal.type]}`}>
              {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
            </span>
            {meal.prepTime && (
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {meal.prepTime} min
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{meal.name}</h3>
          
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div>
              <p className="text-gray-500 text-xs">Calories</p>
              <p className="font-semibold text-gray-900">{meal.calories}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Protein</p>
              <p className="font-semibold text-gray-900">{meal.protein}g</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Carbs</p>
              <p className="font-semibold text-gray-900">{meal.carbs}g</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Fats</p>
              <p className="font-semibold text-gray-900">{meal.fats}g</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

