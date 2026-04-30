import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Briefcase,
  Building2, Flag, CheckCircle,
  Edit, ArrowLeft, Eye, EyeOff, Lock, X, AlertCircle
} from 'lucide-react';
import {
  getUserProfile,
  updateUserProfile,
  updatePassword
} from '../../apirequest/userProfile';
import { origin } from '../../apirequest/config';
import { Alert, Snackbar } from '@mui/material';
import Cookies from 'js-cookie';

interface UserProfileData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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
  authProvider?: string;
  profilePicture?: string;
  profileImage?: string;
  createdAt: string;
}

const UserProfilePage = () => {
  const [searchParams] = useSearchParams();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [needsProfileCompletion, setNeedsProfileCompletion] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<UserProfileData>>({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('authToken');
      
      if (!token) {
        setSnackbar({ open: true, message: 'Please login first', severity: 'error' });
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      const response = await getUserProfile(token);
      
      if (response.success && response.user) {
        setProfileData(response.user);
        setEditFormData(response.user);

        // Check if profile needs completion
        const completeParam = searchParams.get('complete');
        if (completeParam === 'true') {
          setNeedsProfileCompletion(true);
          setEditModalOpen(true);
        }
      } else {
        setSnackbar({ open: true, message: response.message || 'Failed to load profile', severity: 'error' });
      }
    } catch (error: any) {
      console.error('Failed to fetch profile:', error);
      setSnackbar({ open: true, message: 'Failed to load profile', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setEditFormData(profileData || {});
    setProfileImageFile(null);
    setProfileImagePreview(null);
    setEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        setProfileImageFile(files[0]);
        setProfileImagePreview(URL.createObjectURL(files[0]));
      }
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const token = Cookies.get('authToken');
      
      if (!token) {
        setSnackbar({ open: true, message: 'Session expired. Please login again.', severity: 'error' });
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      const response = await updateUserProfile(token, {
        ...editFormData,
        ...(profileImageFile ? { profileImageFile } : {}),
      });
      
      if (response.success) {
        setProfileData(response.user);
        setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
        setEditModalOpen(false);
        setNeedsProfileCompletion(false);
      } else {
        setSnackbar({ open: true, message: response.message || 'Failed to update profile', severity: 'error' });
      }
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({ open: true, message: 'Passwords do not match', severity: 'error' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setSnackbar({ open: true, message: 'Password must be at least 6 characters', severity: 'error' });
      return;
    }

    try {
      setSubmitting(true);
      const token = Cookies.get('authToken');
      
      if (!token) {
        setSnackbar({ open: true, message: 'Session expired. Please login again.', severity: 'error' });
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      const response = await updatePassword(token, passwordData);
      
      if (response.success) {
        setSnackbar({ open: true, message: response.message || 'Password updated successfully!', severity: 'success' });
        setPasswordModalOpen(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setSnackbar({ open: true, message: response.message || 'Failed to update password', severity: 'error' });
      }
    } catch (error: any) {
      console.error('Failed to update password:', error);
      setSnackbar({ open: true, message: 'Failed to update password', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Profile not found</h2>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
            <div className="flex items-center space-x-4">
              {profileData.authProvider && profileData.authProvider !== 'local' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {profileData.authProvider === 'google' ? 'Google Account' : `${profileData.authProvider} Account`}
                </span>
              )}
              {profileData.isVerified && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  <span className="text-sm">Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile completion alert */}
        {needsProfileCompletion && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              <p className="text-yellow-800">
                Please complete your profile information to access all features.
              </p>
            </div>
          </div>
        )}

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Profile avatar */}
              {(profileData.profilePicture || profileData.profileImage) ? (
                <img
                  src={
                    profileData.profilePicture
                      ? profileData.profilePicture
                      : `${origin}/uploads/profile/${profileData.profileImage}`
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-200">
                  <span className="text-2xl font-bold text-indigo-600">
                    {profileData.firstName?.charAt(0)}{profileData.lastName?.charAt(0)}
                  </span>
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900">Profile Information</h1>
            </div>
            <button
              onClick={handleEditClick}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Personal Information</h2>
              
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-gray-900 font-medium">{profileData.firstName} {profileData.lastName}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">{profileData.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-gray-900 font-medium">{profileData.phoneNumber || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Briefcase className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Occupation</p>
                  <p className="text-gray-900 font-medium">{profileData.occupation || 'Not specified'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Building2 className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="text-gray-900 font-medium">{profileData.companyName || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Address Information</h2>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900 font-medium">{profileData.address1 || 'Not provided'}</p>
                  {profileData.address2 && <p className="text-gray-900 font-medium">{profileData.address2}</p>}
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="text-gray-900 font-medium">{profileData.city || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="text-gray-900 font-medium">{profileData.state || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Flag className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="text-gray-900 font-medium">{profileData.country || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">ZIP Code</p>
                  <p className="text-gray-900 font-medium">{profileData.zip || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Gothram</p>
                  <p className="text-gray-900 font-medium">{profileData.gothram || 'Not specified'}</p>
                </div>
              </div>

              {profileData.referredBy && (
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Referred By</p>
                    <p className="text-gray-900 font-medium">{profileData.referredBy}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Change Password Button */}
          <div className="mt-8 pt-6 border-t">
            <button
              onClick={() => setPasswordModalOpen(true)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Lock className="h-4 w-4 mr-2" />
              {profileData.authProvider && profileData.authProvider !== 'local' ? 'Set Password' : 'Change Password'}
            </button>
            {profileData.authProvider && profileData.authProvider !== 'local' && (
              <p className="text-sm text-gray-500 mt-2">
                Set a password to enable email/password login in addition to OAuth.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => {
                  setEditModalOpen(false);
                  setProfileImageFile(null);
                  setProfileImagePreview(null);
                  if (!needsProfileCompletion) setEditFormData(profileData);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                <div className="flex items-center space-x-4">
                  {(profileImagePreview || profileData?.profilePicture || profileData?.profileImage) ? (
                    <img
                      src={
                        profileImagePreview ||
                        (profileData?.profilePicture
                          ? profileData.profilePicture
                          : `${origin}/uploads/profile/${profileData?.profileImage}`)
                      }
                      alt="Profile preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-indigo-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-200">
                      <span className="text-2xl font-bold text-indigo-600">
                        {editFormData.firstName?.charAt(0)}{editFormData.lastName?.charAt(0)}
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    name="profileImageFile"
                    accept="image/*"
                    onChange={handleEditChange}
                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <select
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={editFormData.phoneNumber || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                  <input
                    type="text"
                    name="address1"
                    value={editFormData.address1 || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                  <input
                    type="text"
                    name="address2"
                    value={editFormData.address2 || ''}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={editFormData.city || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={editFormData.state || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={editFormData.country || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                  <input
                    type="text"
                    name="zip"
                    value={editFormData.zip || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Occupation *</label>
                  <input
                    type="text"
                    name="occupation"
                    value={editFormData.occupation || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={editFormData.companyName || ''}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gothram</label>
                  <input
                    type="text"
                    name="gothram"
                    value={editFormData.gothram || ''}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Referred By</label>
                  <input
                    type="text"
                    name="referredBy"
                    value={editFormData.referredBy || ''}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setEditModalOpen(false);
                    setProfileImageFile(null);
                    setProfileImagePreview(null);
                    if (!needsProfileCompletion) setEditFormData(profileData);
                  }}
                  disabled={submitting}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {profileData.authProvider && profileData.authProvider !== 'local' ? 'Set Password' : 'Change Password'}
              </h2>
              <button
                onClick={() => {
                  setPasswordModalOpen(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {(!profileData.authProvider || profileData.authProvider === 'local') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password *</label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password *</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password *</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setPasswordModalOpen(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  disabled={submitting}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {submitting ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserProfilePage;
