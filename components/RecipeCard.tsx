'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users } from 'lucide-react';
import { Recipe } from '@/lib/api';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        {recipe.imageUrl && (
          <div className="relative h-48 w-full">
            <Image
              src={recipe.imageUrl}
              alt={recipe.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
          
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {recipe.prepTime + recipe.cookTime} min
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {recipe.servings} servings
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 text-sm pt-3 border-t border-gray-100">
            <div>
              <p className="text-gray-500 text-xs">Calories</p>
              <p className="font-semibold text-gray-900">{recipe.calories}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Protein</p>
              <p className="font-semibold text-gray-900">{recipe.protein}g</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Carbs</p>
              <p className="font-semibold text-gray-900">{recipe.carbs}g</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Fats</p>
              <p className="font-semibold text-gray-900">{recipe.fats}g</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

