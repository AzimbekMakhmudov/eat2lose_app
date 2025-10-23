'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { fetchGroceryList, updateGroceryItem, GroceryItem } from '@/lib/api';
import Topbar from '@/components/Topbar';
import { ShoppingCart, CheckCircle2, Circle } from 'lucide-react';

export default function GroceryPage() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const data = await fetchGroceryList(user.uid);
        setItems(data);
      } catch (error) {
        console.error('Error loading grocery list:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleToggle = async (itemName: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const item = items.find((i) => i.name === itemName);
    if (!item) return;

    const newChecked = !item.checked;
    
    // Optimistic update
    setItems(items.map((i) => 
      i.name === itemName ? { ...i, checked: newChecked } : i
    ));

    try {
      await updateGroceryItem(user.uid, itemName, newChecked);
    } catch (error) {
      // Revert on error
      setItems(items.map((i) => 
        i.name === itemName ? { ...i, checked: !newChecked } : i
      ));
      console.error('Error updating grocery item:', error);
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  const checkedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  return (
    <div>
      <Topbar title="Grocery List" />
      <div className="p-6">
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-900">Shopping Progress</h2>
              <span className="text-sm text-gray-600">
                {checkedCount} of {totalCount} items
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2 text-primary-600" />
                    {category}
                  </h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {categoryItems.map((item) => (
                    <li key={item.name} className="px-6 py-4">
                      <button
                        onClick={() => handleToggle(item.name)}
                        className="flex items-center justify-between w-full text-left hover:bg-gray-50 -mx-6 px-6 py-4 -my-4 transition-colors"
                      >
                        <div className="flex items-center flex-1">
                          {item.checked ? (
                            <CheckCircle2 className="w-6 h-6 text-primary-600 mr-3 flex-shrink-0" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-300 mr-3 flex-shrink-0" />
                          )}
                          <div>
                            <p className={`font-medium ${item.checked ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                              {item.name}
                            </p>
                            <p className={`text-sm ${item.checked ? 'text-gray-300' : 'text-gray-600'}`}>
                              {item.amount}
                            </p>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

