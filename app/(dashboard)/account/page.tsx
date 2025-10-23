'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { fetchUserProfile, fetchSubscription, updateUserProfile, User, Subscription } from '@/lib/api';
import Topbar from '@/components/Topbar';
import { User as UserIcon, CreditCard, Globe, Save } from 'lucide-react';

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    language: 'en',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const [userData, subData] = await Promise.all([
          fetchUserProfile(currentUser.uid),
          fetchSubscription(currentUser.uid),
        ]);

        setUser(userData);
        setSubscription(subData);
        setFormData({
          name: userData.name,
          age: userData.age?.toString() || '',
          height: userData.height?.toString() || '',
          weight: userData.weight?.toString() || '',
          language: userData.language || 'en',
        });
      } catch (error) {
        console.error('Error loading account data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    setSaving(true);
    try {
      await updateUserProfile(currentUser.uid, {
        name: formData.name,
        age: parseInt(formData.age),
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        language: formData.language,
      } as Partial<User>);

      // Reload user data
      const userData = await fetchUserProfile(currentUser.uid);
      setUser(userData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const planLabels = {
    free: 'Free Plan',
    monthly: 'Monthly Plan',
    yearly: 'Yearly Plan',
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    cancelled: 'bg-yellow-100 text-yellow-800',
    expired: 'bg-red-100 text-red-800',
  };

  if (loading) {
    return (
      <div>
        <Topbar title="Account" />
        <div className="p-6">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Topbar title="Account" />
      <div className="p-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <UserIcon className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
            </div>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>
          </div>
        </div>

        {subscription && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <CreditCard className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Subscription</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {planLabels[subscription.plan]}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Started {new Date(subscription.startDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[subscription.status]}`}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </span>
              </div>
              {subscription.endDate && (
                <p className="text-sm text-gray-600 mb-4">
                  Renews on {new Date(subscription.endDate).toLocaleDateString()}
                </p>
              )}
              <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                Manage Subscription
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center">
            <Globe className="w-5 h-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
          </div>
          <div className="p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                disabled={!editMode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-600"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

