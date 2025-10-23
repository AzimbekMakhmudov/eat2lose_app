'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { fetchWeightHistory, addWeightEntry, WeightEntry } from '@/lib/api';
import Topbar from '@/components/Topbar';
import ChartWeight from '@/components/ChartWeight';
import { Plus, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';

export default function ProgressPage() {
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const data = await fetchWeightHistory(user.uid);
        setWeightHistory(data);
      } catch (error) {
        console.error('Error loading weight history:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddWeight = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      const newEntry: Omit<WeightEntry, 'id'> = {
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(newWeight),
        note: newNote || undefined,
      };

      await addWeightEntry(user.uid, newEntry);
      
      // Reload data
      const data = await fetchWeightHistory(user.uid);
      setWeightHistory(data);
      
      setShowAddModal(false);
      setNewWeight('');
      setNewNote('');
    } catch (error) {
      console.error('Error adding weight entry:', error);
    }
  };

  const currentWeight = weightHistory[weightHistory.length - 1]?.weight || 0;
  const startWeight = weightHistory[0]?.weight || 0;
  const weightLost = startWeight - currentWeight;
  const percentageLost = startWeight > 0 ? (weightLost / startWeight) * 100 : 0;

  return (
    <div>
      <Topbar title="Progress" />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Current Weight</p>
              <TrendingDown className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{currentWeight.toFixed(1)} kg</p>
            <p className="text-sm text-gray-500 mt-1">
              {format(new Date(), 'MMM d, yyyy')}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Weight Lost</p>
            <p className="text-3xl font-bold text-primary-600">
              {weightLost > 0 ? '-' : ''}{Math.abs(weightLost).toFixed(1)} kg
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {percentageLost.toFixed(1)}% of starting weight
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Starting Weight</p>
            <p className="text-3xl font-bold text-gray-900">{startWeight.toFixed(1)} kg</p>
            <p className="text-sm text-gray-500 mt-1">
              {weightHistory[0] ? format(new Date(weightHistory[0].date), 'MMM d, yyyy') : '-'}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        ) : (
          <ChartWeight data={weightHistory} />
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Weight Entry
          </button>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add Weight Entry</h3>
              <form onSubmit={handleAddWeight} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="75.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note (optional)
                  </label>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Feeling great today!"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    Add Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

