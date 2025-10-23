// API utilities for fetching data from backend

export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  height?: number;
  weight?: number;
  allergies?: string[];
  dislikes?: string[];
  language?: string;
  hasCompletedOnboarding: boolean;
}

export interface Meal {
  id: string;
  recipeId: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  imageUrl?: string;
  prepTime?: number;
}

export interface DayPlan {
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: {
    name: string;
    amount: string;
  }[];
  steps: string[];
  tags?: string[];
}

export interface GroceryItem {
  name: string;
  amount: string;
  category: string;
  checked: boolean;
}

export interface WeightEntry {
  date: string;
  weight: number;
  note?: string;
}

export interface Subscription {
  plan: 'free' | 'monthly' | 'yearly';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate?: string;
}

// Mock API functions - replace with actual API calls
export async function fetchUserProfile(userId: string): Promise<User> {
  // TODO: Replace with actual API call
  return {
    id: userId,
    email: 'user@example.com',
    name: 'John Doe',
    age: 30,
    height: 175,
    weight: 80,
    allergies: ['peanuts'],
    dislikes: ['mushrooms'],
    language: 'en',
    hasCompletedOnboarding: true,
  };
}

export async function fetchTodayMealPlan(userId: string): Promise<DayPlan> {
  // TODO: Replace with actual API call
  const today = new Date().toISOString().split('T')[0];
  return {
    date: today,
    meals: [
      {
        id: '1',
        recipeId: 'recipe-1',
        name: 'Greek Yogurt Bowl',
        type: 'breakfast',
        calories: 350,
        protein: 25,
        carbs: 45,
        fats: 8,
        imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
        prepTime: 10,
      },
      {
        id: '2',
        recipeId: 'recipe-2',
        name: 'Grilled Chicken Salad',
        type: 'lunch',
        calories: 450,
        protein: 40,
        carbs: 30,
        fats: 15,
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        prepTime: 20,
      },
      {
        id: '3',
        recipeId: 'recipe-3',
        name: 'Salmon with Vegetables',
        type: 'dinner',
        calories: 550,
        protein: 45,
        carbs: 35,
        fats: 22,
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
        prepTime: 30,
      },
    ],
    totalCalories: 1350,
    totalProtein: 110,
    totalCarbs: 110,
    totalFats: 45,
  };
}

export async function fetchWeekPlan(userId: string): Promise<DayPlan[]> {
  // TODO: Replace with actual API call
  const days: DayPlan[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      meals: [],
      totalCalories: 1400 + Math.random() * 200,
      totalProtein: 100 + Math.random() * 20,
      totalCarbs: 120 + Math.random() * 30,
      totalFats: 45 + Math.random() * 15,
    });
  }
  
  return days;
}

export async function fetchMonthPlan(userId: string): Promise<DayPlan[]> {
  // TODO: Replace with actual API call
  const days: DayPlan[] = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      meals: [],
      totalCalories: 1400 + Math.random() * 200,
      totalProtein: 100 + Math.random() * 20,
      totalCarbs: 120 + Math.random() * 30,
      totalFats: 45 + Math.random() * 15,
    });
  }
  
  return days;
}

export async function fetchRecipe(recipeId: string): Promise<Recipe> {
  // TODO: Replace with actual API call
  return {
    id: recipeId,
    name: 'Greek Yogurt Bowl',
    description: 'A healthy and delicious breakfast bowl with Greek yogurt, fresh berries, and granola.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    calories: 350,
    protein: 25,
    carbs: 45,
    fats: 8,
    ingredients: [
      { name: 'Greek yogurt', amount: '1 cup' },
      { name: 'Mixed berries', amount: '1/2 cup' },
      { name: 'Granola', amount: '1/4 cup' },
      { name: 'Honey', amount: '1 tbsp' },
      { name: 'Chia seeds', amount: '1 tsp' },
    ],
    steps: [
      'Add Greek yogurt to a bowl',
      'Top with mixed berries',
      'Sprinkle granola over the berries',
      'Drizzle with honey',
      'Add chia seeds on top',
      'Serve immediately',
    ],
    tags: ['breakfast', 'healthy', 'quick', 'vegetarian'],
  };
}

export async function fetchGroceryList(userId: string): Promise<GroceryItem[]> {
  // TODO: Replace with actual API call
  return [
    { name: 'Greek yogurt', amount: '7 cups', category: 'Dairy', checked: false },
    { name: 'Chicken breast', amount: '1.5 kg', category: 'Protein', checked: false },
    { name: 'Salmon fillets', amount: '500g', category: 'Protein', checked: false },
    { name: 'Mixed berries', amount: '3 cups', category: 'Fruits', checked: false },
    { name: 'Spinach', amount: '2 bags', category: 'Vegetables', checked: false },
    { name: 'Broccoli', amount: '3 heads', category: 'Vegetables', checked: false },
    { name: 'Brown rice', amount: '1 kg', category: 'Grains', checked: false },
    { name: 'Olive oil', amount: '1 bottle', category: 'Pantry', checked: false },
  ];
}

export async function fetchWeightHistory(userId: string): Promise<WeightEntry[]> {
  // TODO: Replace with actual API call
  const entries: WeightEntry[] = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    entries.push({
      date: date.toISOString().split('T')[0],
      weight: 80 - (30 - i) * 0.15 + Math.random() * 0.5,
    });
  }
  
  return entries;
}

export async function fetchSubscription(userId: string): Promise<Subscription> {
  // TODO: Replace with actual API call
  return {
    plan: 'monthly',
    status: 'active',
    startDate: '2025-01-01',
    endDate: '2025-11-01',
  };
}

export async function updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
  // TODO: Replace with actual API call
  console.log('Updating user profile:', userId, data);
  return fetchUserProfile(userId);
}

export async function addWeightEntry(userId: string, entry: Omit<WeightEntry, 'id'>): Promise<void> {
  // TODO: Replace with actual API call
  console.log('Adding weight entry:', userId, entry);
}

export async function updateGroceryItem(userId: string, itemName: string, checked: boolean): Promise<void> {
  // TODO: Replace with actual API call
  console.log('Updating grocery item:', userId, itemName, checked);
}

