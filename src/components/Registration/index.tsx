// TODO: Replace with your actual site key
const RECAPTCHA_SITE_KEY = '6LfRgNIsAAAAAG8EdNa1SfMdIm_L4KRB7OD-rsWr';
import React from 'react';

// Simple modal component for registration success
const RegistrationSuccessModal = ({ open, onLogin }: { open: boolean; onLogin: () => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold mb-2">Thanks for Registering!</h2>
        <p className="mb-6 text-gray-700">Your registration was successful. You can now log in to your account.</p>
        <button
          onClick={onLogin}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
};
import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
// TODO: Replace with your actual site key
import { User, Mail, Lock, Phone, Home, MapPin, Flag, CheckCircle, XCircle, ArrowLeft, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { OTPEmailVerification, resendOTPEmailVerification, signupUser } from '../../apirequest/auth';

interface StateProvince {
  code: string;
  name: string;
}

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
      {title}
    </h3>
    {children}
  </div>
);

function Registration() {
  // Handler for login button in modal (must be top-level)
  const handleSuccessLogin = () => {
    window.location.href = '/login';
  };
  // Snackbar notification
  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false,
    type: 'info' as 'info' | 'success' | 'error'
    
  });


  // Verification state
  const [verificationStep, setVerificationStep] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailForVerification, setEmailForVerification] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // reCAPTCHA state
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [statesError, setStatesError] = useState('');

  const [statesProvinces, setStatesProvinces] = useState<{
    usStates: StateProvince[];
    canadaProvinces: StateProvince[];
  }>({
    usStates: [],
    canadaProvinces: []
  });

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    zip: '',
    // Optional fields below
    address1: '',
    address2: '',
    country: 'USA',
    state: '',
    city: '',
    referredBy: '',
    occupation: '',
    companyName: '',
    gothram: '',
    profileImage: null as File | null,
    profileImageUrl: '',
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Navigation to login
  const handleGoToLogin = () => {
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchStatesProvinces = async () => {
      setIsLoadingStates(true);
      setStatesError('');
      try {
        // Mock data - in a real app, you would fetch this from your backend
        const mockData = {
          usStates: [
            { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
            { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
            { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
            { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
            { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
            { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
            { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
            { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
            { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
            { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
            { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
            { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
            { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
            { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
            { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
            { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
            { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
            { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
            { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
            { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
            { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
            { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
            { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
            { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
            { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
          ],
          canadaProvinces: [
            { code: 'AB', name: 'Alberta' }, { code: 'BC', name: 'British Columbia' },
            { code: 'MB', name: 'Manitoba' }, { code: 'NB', name: 'New Brunswick' },
            { code: 'NL', name: 'Newfoundland and Labrador' }, { code: 'NT', name: 'Northwest Territories' },
            { code: 'NS', name: 'Nova Scotia' }, { code: 'NU', name: 'Nunavut' },
            { code: 'ON', name: 'Ontario' }, { code: 'PE', name: 'Prince Edward Island' },
            { code: 'QC', name: 'Quebec' }, { code: 'SK', name: 'Saskatchewan' },
            { code: 'YT', name: 'Yukon' }
          ]
        };

        setStatesProvinces(mockData);
      } catch (error) {
        console.error('Failed to fetch states/provinces:', error);
        setStatesError('Failed to load states/provinces. Please refresh the page.');
      } finally {
        setIsLoadingStates(false);
      }
    };
    fetchStatesProvinces();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files && files[0]) {
      setFormData(prev => ({ ...prev, profileImage: files[0], profileImageUrl: URL.createObjectURL(files[0]) }));
    } else {
      // Reset state when country changes
      if (name === 'country') {
        setFormData(prev => ({ ...prev, [name]: value, state: '' }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Personal Information
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    // Strong password validation
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!strongPasswordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Contact Information
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.zip) newErrors.zip = 'ZIP code is required';
    // Address is now optional, so no validation here

    // reCAPTCHA validation
    if (!recaptchaToken) {
      newErrors.recaptcha = 'Please verify that you are not a robot.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.border-red-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    try {
      setIsSubmitting(true);
      // Pass recaptchaToken along with formData
      const response = await signupUser({ ...formData, recaptchaToken });

      if (response.message?.includes('success') || response.data?.requiresVerification) {
        setEmailForVerification(formData.email);
        setVerificationStep(true);
        showSnackbar('Verification code sent to your email.', 'success');
      } else {
        showSnackbar('Registration successful! Redirecting...', 'success');
        setTimeout(() => window.location.href = '/login', 2000);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      showSnackbar(
        error.response?.data?.message ||
        error.message ||
        'Registration failed. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegistrationFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();

      // Avoid accidental submit while users are still typing in inputs.
      if (tag === 'input' || tag === 'select') {
        e.preventDefault();
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      showSnackbar('Please enter a valid 6-digit code', 'error');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await OTPEmailVerification(emailForVerification, otp);

      if (response.success || response.message?.includes('success')) {
        setShowSuccessModal(true);
      } else {
        showSnackbar(response.message || 'Verification failed. Please try again.', 'error');
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      showSnackbar(
        error.response?.data?.message ||
        'An error occurred during verification',
        'error'
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const response = await resendOTPEmailVerification(emailForVerification);

      if (response.success) {
        showSnackbar('New verification code sent to your email.', 'success');
      } else {
        showSnackbar(response.message || 'Failed to resend code', 'error');
      }
    } catch (error: any) {
      console.error('Resend error:', error);
      showSnackbar(
        error.response?.data?.message ||
        'An error occurred while resending code',
        'error'
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToRegister = () => {
    setVerificationStep(false);
    setOtp('');
  };

  const showSnackbar = (message: string, type: 'info' | 'success' | 'error') => {
    setSnackbar({ message, open: true, type });
    setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 5000);
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/50 ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'
    }`;

  const iconClasses = "absolute left-3 top-3.5 h-5 w-5 text-gray-400";

  if (verificationStep) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8">
              <button
                onClick={handleBackToRegister}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to registration
              </button>

              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Verify Your Email</h2>
                <p className="mt-2 text-sm text-gray-600">
                  We've sent a 6-digit code to <span className="font-medium break-all">{emailForVerification}</span>
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={handleOtpChange}
                    className={inputClasses('otp')}
                    placeholder="Enter 6-digit code"
                    required
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                  />
                  <Lock className={iconClasses} />
                </div>

                <button
                  type="submit"
                  disabled={isVerifying || otp.length !== 6}
                  className={`w-full px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors ${isVerifying || otp.length !== 6
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {isVerifying ? 'Verifying...' : 'Verify Email'}
                </button>

                <div className="text-center text-sm text-gray-600">
                  <p>Didn't receive the code?</p>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className={`text-blue-600 ${isResending ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-800'
                      } font-medium transition-colors`}
                  >
                    {isResending ? 'Sending...' : 'Resend Code'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <Snackbar {...snackbar} onClose={closeSnackbar} />
        </div>
        <RegistrationSuccessModal open={showSuccessModal} onLogin={handleSuccessLogin} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Join NAPA USA</h2>
            <p className="mt-2 text-sm text-gray-600">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} onKeyDown={handleRegistrationFormKeyDown} className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar" encType="multipart/form-data">
            {/* ...existing code... */}
            {/* Profile Image Upload */}
            <div className="mb-4 flex flex-col items-center">
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
              <input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.profileImageUrl && (
                <img src={formData.profileImageUrl} alt="Profile Preview" className="mt-2 w-24 h-24 rounded-full object-cover border" />
              )}
            </div>
            {/* Personal Information Section */}
            <FormSection title="Personal Information">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={inputClasses('firstName')}
                      placeholder="First Name *"
                      required
                    />
                    <User className={iconClasses} />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={inputClasses('lastName')}
                      placeholder="Last Name *"
                      required
                    />
                    <User className={iconClasses} />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      className={inputClasses('email')}
                      placeholder="Email Address *"
                      required
                    />
                    <Mail className={iconClasses} />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={inputClasses('password')}
                      placeholder="Password *"
                      required
                      minLength={8}
                    />
                    <Lock className={iconClasses} />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {errors.password ? (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.password}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 8 characters, include uppercase, lowercase, number, and special character
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={inputClasses('confirmPassword')}
                      placeholder="Confirm Password *"
                      required
                    />
                    <Lock className={iconClasses} />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 -mt-2">
                  Password must be at least 6 characters long
                </p>
              </div>
            </FormSection>

            {/* Contact Information Section */}
            <FormSection title="Contact Information">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={inputClasses('phoneNumber')}
                      placeholder="Phone Number *"
                      required
                    />
                    <Phone className={iconClasses} />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      className={inputClasses('address1')}
                      placeholder="Address 1 (optional)"
                    />
                    <Home className={iconClasses} />
                    {errors.address1 && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.address1}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className={inputClasses('address2')}
                      placeholder="Address 2"
                    />
                    <Home className={iconClasses} />
                  </div>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={inputClasses('country')}
                      required
                    >
                      <option value="USA">United States</option>
                      <option value="CAN">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AUS">Australia</option>
                      <option value="IND">India</option>
                    </select>
                    <Flag className={iconClasses} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={inputClasses('state')}
                      required
                      disabled={isLoadingStates}
                    >
                      <option value="">
                        {isLoadingStates ? 'Loading states...' : 'Select State/Province *'}
                      </option>
                      {formData.country === 'USA' && statesProvinces.usStates.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name}
                        </option>
                      ))}
                      {formData.country === 'CAN' && statesProvinces.canadaProvinces.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                      {!['USA', 'CAN'].includes(formData.country) && (
                        <option value="OTHER">Other</option>
                      )}
                    </select>
                    <MapPin className={iconClasses} />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={inputClasses('city')}
                      placeholder="City *"
                      required
                    />
                    <MapPin className={iconClasses} />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className={inputClasses('zip')}
                      placeholder="ZIP Code *"
                      required
                    />
                    <MapPin className={iconClasses} />
                    {errors.zip && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.zip}
                      </p>
                    )}
                  </div>
                </div>
                {statesError && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {statesError}
                  </p>
                )}
              </div>
            </FormSection>
            {/* reCAPTCHA - moved to just above the submit button */}
            <div className="mb-4 flex flex-col items-center">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token: string | null) => setRecaptchaToken(token)}
                onExpired={() => setRecaptchaToken(null)}
              />
              {errors.recaptcha && (
                <p className="text-red-500 text-xs mt-1">{errors.recaptcha}</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="pt-4 bg-white/80 backdrop-blur-sm pb-2">
              <button
                type="submit"
                disabled={isSubmitting || !recaptchaToken}
                className={`w-full px-8 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors ${(isSubmitting || !recaptchaToken)
                  ? 'bg-green-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Button to go to login */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={handleGoToLogin}
          className="text-indigo-600 hover:text-indigo-700 font-medium underline transition-colors"
        >
          Already have an account? Login
        </button>
      </div>

      <Snackbar {...snackbar} onClose={closeSnackbar} />

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div >
  );
}

const Snackbar = ({
  message,
  open,
  type,
  onClose
}: {
  message: string;
  open: boolean;
  type: 'info' | 'success' | 'error';
  onClose: () => void
}) => {
  if (!open) return null;

  const bgColor = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    error: 'bg-red-600'
  }[type];

  const icon = {
    info: null,
    success: <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />,
    error: <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
  }[type];

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 p-4 ${bgColor} text-white rounded-lg shadow-lg flex items-center max-w-md mx-auto sm:mx-0 z-50 cursor-pointer transition-all duration-300`}
      onClick={onClose}
      role="alert"
    >
      {icon}
      <span className="flex-1">{message}</span>
    </div>
  );
};

export default Registration;