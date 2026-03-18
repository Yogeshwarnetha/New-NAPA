import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Briefcase, 
  Building2, Flag, Calendar, Shield, CheckCircle,
  Edit, ArrowLeft, Eye, EyeOff, Lock, X
} from 'lucide-react';
import { getUserProfile, changePassword } from '../../apirequest/auth';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  occupation: string;
  companyName: string;
  gothram: string;
  referredBy: string;
  isVerified: boolean;
  createdAt: string;
  profileImage?: string;
}

const UserProfile = () => {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<UserProfileData> & { profileImageFile?: File | null, profileImageUrl?: string }>({});
  const [removingImage, setRemovingImage] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile();
      setProfileData(response.data);
      setEditFormData(response.data);
    } catch (error: any) {
      console.error('Failed to fetch profile:', error);
      toast.error(error?.response?.data?.message || 'Failed to load profile');
      if (error?.response?.status === 401) {
        setTimeout(() => navigate('/login'), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  const handleEditClick = () => {
    setEditFormData(profileData || {});
    setEditModalOpen(true);
  };


  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files && files[0]) {
      setEditFormData(prev => ({
        ...prev,
        profileImageFile: files[0],
        profileImageUrl: URL.createObjectURL(files[0])
      }));
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const formData = new FormData();
      Object.entries(editFormData).forEach(([key, value]) => {
        if (key === 'profileImageFile' && value) {
          formData.append('profileImage', value as File);
        } else if (key !== 'profileImageUrl' && value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });
      const token = localStorage.getItem('authToken') || (document.cookie.match(/authToken=([^;]+)/)?.[1] ?? '');
      const response = await axios.put('/api/v1/auth/profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProfileData(response.data.data);
      toast.success('Profile updated successfully!');
      setEditModalOpen(false);
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveProfileImage = async () => {
    if (!profileData?.profileImage) return;
    setRemovingImage(true);
    try {
      const token = localStorage.getItem('authToken') || (document.cookie.match(/authToken=([^;]+)/)?.[1] ?? '');
      await axios.delete('/api/v1/auth/profile/image', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProfileData(prev => prev ? { ...prev, profileImage: undefined } : prev);
      setEditFormData(prev => ({ ...prev, profileImageFile: null, profileImageUrl: undefined }));
      toast.success('Profile image removed');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to remove image');
    } finally {
      setRemovingImage(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      setSubmitting(true);
      await changePassword(passwordData);
      toast.success('Password changed successfully!');
      setPasswordModalOpen(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error: any) {
      console.error('Failed to change password:', error);
      toast.error(error?.response?.data?.message || 'Failed to change password');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load profile</p>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-4 mr-6">
                  <User className="w-12 h-12 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <div className="flex items-center mt-2">
                    {profileData.isVerified ? (
                      <span className="flex items-center text-green-200 text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified Account
                      </span>
                    ) : (
                      <span className="flex items-center text-yellow-200 text-sm">
                        <Shield className="w-4 h-4 mr-1" />
                        Unverified Account
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={handleEditClick}
                className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Details</h3>
              
              <div className="flex items-start">
                <User className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-gray-800 font-medium">
                    {profileData.firstName} {profileData.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-gray-800 font-medium">{profileData.gender}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-gray-800 font-medium">{profileData.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-gray-800 font-medium">{profileData.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(profileData.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Address</h3>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Street Address</p>
                  <p className="text-gray-800 font-medium">{profileData.address1}</p>
                  {profileData.address2 && (
                    <p className="text-gray-800 font-medium">{profileData.address2}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="text-gray-800 font-medium">{profileData.city}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="text-gray-800 font-medium">{profileData.state}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Flag className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="text-gray-800 font-medium">{profileData.country}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">ZIP Code</p>
                  <p className="text-gray-800 font-medium">{profileData.zip}</p>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Professional Details</h3>
              
              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Occupation</p>
                  <p className="text-gray-800 font-medium">{profileData.occupation || 'Not specified'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Building2 className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="text-gray-800 font-medium">{profileData.companyName || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Additional Information</h3>
              
              <div className="flex items-start">
                <User className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Gothram</p>
                  <p className="text-gray-800 font-medium">{profileData.gothram || 'Not specified'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="w-5 h-5 text-indigo-600 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Referred By</p>
                  <p className="text-gray-800 font-medium">{profileData.referredBy || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setPasswordModalOpen(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center"
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </button>
            <button
              onClick={handleEditClick}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6">
              {/* Profile Image Upload */}
              <div className="mb-4 flex flex-col items-center md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                {(editFormData.profileImageUrl || profileData?.profileImage) ? (
                  <div className="relative mb-2">
                    <img
                      src={editFormData.profileImageUrl || `/api/v1/uploads/profile/${profileData?.profileImage}`}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover border"
                    />
                    {profileData?.profileImage && !editFormData.profileImageUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveProfileImage}
                        disabled={removingImage}
                        className="absolute top-0 right-0 bg-white rounded-full p-1 shadow hover:bg-red-100"
                        title="Remove profile image"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    )}
                  </div>
                ) : null}
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleEditChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={editFormData.phoneNumber || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={editFormData.gender || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Address Line 1 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="address1"
                    value={editFormData.address1 || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Address Line 2 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={editFormData.address2 || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={editFormData.city || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={editFormData.state || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={editFormData.country || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={editFormData.zip || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={editFormData.occupation || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={editFormData.companyName || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Gothram */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gothram
                  </label>
                  <input
                    type="text"
                    name="gothram"
                    value={editFormData.gothram || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Referred By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Referred By
                  </label>
                  <input
                    type="text"
                    name="referredBy"
                    value={editFormData.referredBy || ''}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">Change Password</h2>
              <button
                onClick={() => setPasswordModalOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="p-6">
              <div className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmNewPassword"
                      value={passwordData.confirmNewPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
