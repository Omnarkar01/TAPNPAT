import { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import { User, MapPin, Check, X } from 'lucide-react';

export default function CustomerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [customerProfile, setCustomerProfile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const profile = JSON.parse(localStorage.getItem('customerProfile') || '{}');

    setCustomerProfile(profile);

    setFormData({
      fullName: profile?.fullName || user?.name || '',
      email: profile?.email || user?.email || '',
      phoneNumber: profile?.phoneNumber || user?.phone || '',
      city: profile?.city || '',
      state: profile?.state || '',
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedProfile = {
        ...customerProfile,
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('customerProfile', JSON.stringify(updatedProfile));

      setCustomerProfile(updatedProfile);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update profile');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-mcm-dark">
      <Navbar title="Customer Profile" />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 font-medium ${
            message.includes('successfully')
              ? 'bg-soft-mcm-sage/15 border border-soft-mcm-sage/40 text-soft-mcm-sage'
              : 'bg-red-500/15 border border-red-500/40 text-red-300'
          }`}>
            {message.includes('successfully') ? (
              <Check size={20} />
            ) : (
              <X size={20} />
            )}
            {message}
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-soft-mcm-dark/80 border border-gray-700 rounded-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-soft-mcm-sage to-soft-mcm-rose rounded-full flex items-center justify-center shadow-lg shadow-soft-mcm-sage/30">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{formData.fullName || 'Customer Name'}</h2>
                <p className="text-soft-mcm-sage font-medium">✅ Verified Customer</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-soft-mcm-rose hover:bg-soft-mcm-rose-dark text-white font-semibold rounded-lg transition-colors shadow-lg shadow-soft-mcm-rose/30"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Sections */}
        <div className="space-y-6">
          {/* Personal Information */}
          <section className="bg-soft-mcm-dark/80 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <User size={24} className="text-soft-mcm-sage" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg bg-soft-mcm-dark/60 border border-gray-600 text-white ${
                    isEditing ? 'focus:border-soft-mcm-sage focus:outline-none focus:ring-2 focus:ring-soft-mcm-sage/30' : 'opacity-75 cursor-not-allowed'
                  }`}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg bg-soft-mcm-dark/60 border border-gray-600 text-white ${
                    isEditing ? 'focus:border-soft-mcm-sage focus:outline-none focus:ring-2 focus:ring-soft-mcm-sage/30' : 'opacity-75 cursor-not-allowed'
                  }`}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg bg-soft-mcm-dark/60 border border-gray-600 text-white ${
                    isEditing ? 'focus:border-soft-mcm-sage focus:outline-none focus:ring-2 focus:ring-soft-mcm-sage/30' : 'opacity-75 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>
          </section>

          {/* Location & Address */}
          <section className="bg-soft-mcm-dark/80 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MapPin size={24} className="text-soft-mcm-rose" />
              Location Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg bg-soft-mcm-dark/60 border border-gray-600 text-white ${
                    isEditing ? 'focus:border-soft-mcm-sage focus:outline-none focus:ring-2 focus:ring-soft-mcm-sage/30' : 'opacity-75 cursor-not-allowed'
                  }`}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg bg-soft-mcm-dark/60 border border-gray-600 text-white ${
                    isEditing ? 'focus:border-soft-mcm-sage focus:outline-none focus:ring-2 focus:ring-soft-mcm-sage/30' : 'opacity-75 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>
          </section>

          {/* Profile Info */}
          <section className="bg-soft-mcm-dark/80 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Account Status</h3>
            <div className="space-y-2 text-gray-300">
              <p><strong>Status:</strong> <span className="text-soft-mcm-sage font-medium">✅ Verified & Active</span></p>
              <p><strong>Account Created:</strong> {new Date(customerProfile?.createdAt || Date.now()).toLocaleDateString()}</p>
              {customerProfile?.updatedAt && (
                <p><strong>Last Updated:</strong> {new Date(customerProfile.updatedAt).toLocaleDateString()}</p>
              )}
            </div>
          </section>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-soft-mcm-sage to-soft-mcm-rose hover:from-soft-mcm-sage-dark hover:to-soft-mcm-rose-dark text-white rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-lg shadow-soft-mcm-sage/30"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700/40 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
