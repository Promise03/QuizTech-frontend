import React, { useState, useEffect } from 'react';
import Header from '../conponent/Header';
import UserSidebar from '../conponent/Sidebar';

const SettingsPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const CURRENT_USER_ID = storedUser?._id;
  const TOKEN = localStorage.getItem('token');
  // const API_BASE_URL = 'http://localhost:5002/api/users';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' }); // ✅ feedback message

  // 🟦 Fetch User Data (GET /siguleuser/:id)
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/siguleuser/${CURRENT_USER_ID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const result = await response.json();

        const data =
          result.data ||
          result.user ||
          result.userData ||
          result.profile ||
          result ||
          {};

        setUsername(data.username || data.name || '');
        setEmail(data.email || data.userEmail || '');
        setNotifications(!!data.notifications);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage({ type: 'error', text: 'Failed to load user settings.' });
      } finally {
        setLoading(false);
      }
    };

    if (CURRENT_USER_ID && TOKEN) {
      fetchUserData();
    } else {
      setLoading(false);
      console.error('Authentication error: missing user ID or token.');
    }
  }, []);

  // 🟩 Update User Data (PATCH /profile/:id)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    const settingsData = { username, email, password, notifications };

    try {
      const response = await fetch(`${API_BASE_URL}/profile/${CURRENT_USER_ID}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Error: ${response.statusText}`);
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving settings:', error.message);
      setMessage({ type: 'error', text: `Could not save settings: ${error.message}` });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 4000);
    }
  };

  // 🟨 Loading UI
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <p className="text-xl text-indigo-600 font-semibold animate-pulse">
          Loading settings...
        </p>
      </div>
    );
  }

  // 🟪 Main UI
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-auto">

        <div className="p-10 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User Settings</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                isEditing
                  ? 'bg-gray-500 hover:bg-gray-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          {/* ✅ Feedback Message */}
          {message.text && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Settings Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Username</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isSaving}
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-gray-100 rounded-lg text-gray-900 border border-gray-200">
                    {username || '—'}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSaving}
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-gray-100 rounded-lg text-gray-900 border border-gray-200">
                    {email || '—'}
                  </div>
                )}
              </div>

              {/* Password (only visible in edit mode) */}
              {isEditing && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSaving}
                  />
                </div>
              )}

              {/* Notifications */}
              <div className="flex items-center space-x-3 mt-4">
                <input
                  id="notifications"
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  disabled={!isEditing || isSaving}
                />
                <label htmlFor="notifications" className="text-gray-700 font-medium">
                  Enable email notifications
                </label>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm disabled:bg-indigo-400"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Info Note */}
          <div className="text-sm text-gray-500 mt-6">
            <p>
              Manage your profile information and notification preferences. Changes will take effect
              immediately after saving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
