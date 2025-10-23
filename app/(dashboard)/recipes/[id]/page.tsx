'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchRecipe, Recipe } from '@/lib/api';
import Topbar from '@/components/Topbar';
import Image from 'next/image';
import { Clock, Users, ChefHat } from 'lucide-react';

export default function RecipePage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const recipeId = params.id as string;
        const data = await fetchRecipe(recipeId);
        setRecipe(data);
      } catch (error) {
        console.error('Error loading recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.id]);

  if (loading) {
    return (
      <div>
        <Topbar title="Recipe Details" />
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div>
        <Topbar title="Recipe Details" />
        <div className="p-6">
          <p className="text-gray-600">Recipe not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Topbar title="Recipe Details" />
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {recipe.imageUrl && (
            <div className="relative h-96 w-full">
              <Image
                src={recipe.imageUrl}
                alt={recipe.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{recipe.name}</h1>
              <p className="text-gray-600 text-lg">{recipe.description}</p>
            </div>

            <div className="flex gap-6 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>
                  {recipe.prepTime + recipe.cookTime} min total
                  <span className="text-sm text-gray-500 ml-1">
                    ({recipe.prepTime} prep, {recipe.cookTime} cook)
                  </span>
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ChefHat className="w-5 h-5 mr-2" />
                <span>Easy</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{recipe.calories}</p>
                <p className="text-sm text-gray-600 mt-1">Calories</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{recipe.protein}g</p>
                <p className="text-sm text-gray-600 mt-1">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{recipe.carbs}g</p>
                <p className="text-sm text-gray-600 mt-1">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{recipe.fats}g</p>
                <p className="text-sm text-gray-600 mt-1">Fats</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></span>
                      <span className="text-gray-700">
                        <span className="font-medium">{ingredient.amount}</span> {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-medium mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {recipe.tags && recipe.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

