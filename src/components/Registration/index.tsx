import { useState } from 'react';
import {
  User, Mail, Lock, Phone, Home, MapPin, Briefcase,
  Building2, Flag, ChevronLeft, ChevronRight, Users,
  CheckCircle, XCircle, ArrowLeft
} from 'lucide-react';
import { OTPEmailVerification, resendOTPEmailVerification, signupUser } from '../../apirequest/auth';

function Registration() {
  // Form steps state
  const [step, setStep] = useState(1);

  // Snackbar notification
  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false,
    type: 'info' as 'info' | 'success' | 'error'
  });

  // Verification state
  const [verificationStep, setVerificationStep] = useState(false);
  const [emailForVerification, setEmailForVerification] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);


  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    country: 'USA',
    state: '',
    city: '',
    zip: '',
    referredBy: '',
    occupation: '',
    companyName: '',
    gothram: '',
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); // Only allow numbers and limit to 6 digits
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      showSnackbar('Passwords do not match.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await signupUser(formData);

      // Check for successful response or verification requirement
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
        showSnackbar('Email verified successfully! Redirecting to login...', 'success');
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
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

  // Return to registration form
  const handleBackToRegister = () => {
    setVerificationStep(false);
    setOtp('');
  };

  // Helper to show snackbar
  const showSnackbar = (message: string, type: 'info' | 'success' | 'error') => {
    setSnackbar({ message, open: true, type });
    setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 5000);
  };

  // Close snackbar
  const closeSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Navigation between form steps
  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // CSS classes
  const inputClasses = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/50";
  const iconClasses = "absolute left-3 top-3.5 h-5 w-5 text-gray-400";

  // Step indicator component
  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-center space-x-4">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${step >= num ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400'
              }`}
          >
            {num}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 px-4 text-sm text-gray-600">
        <span>Personal</span>
        <span>Contact</span>
        <span>Other</span>
      </div>
    </div>
  );

  // Verification Step UI
  if (verificationStep) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
            <button
              onClick={handleBackToRegister}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to registration
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Verify Your Email</h2>
              <p className="mt-2 text-sm text-gray-600">
                We've sent a 6-digit code to <span className="font-medium">{emailForVerification}</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  className={inputClasses}
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
                className={`w-full px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${isVerifying || otp.length !== 6 ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
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
                  className={`text-blue-600 ${isResending ? 'opacity-50' : 'hover:text-blue-800'} font-medium`}
                >
                  {isResending ? 'Sending...' : 'Resend Code'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <Snackbar {...snackbar} onClose={closeSnackbar} />
      </div>
    );
  }

  // Registration Form UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Join NAPA USA</h2>
            <p className="mt-2 text-sm text-gray-600">Create your account to get started</p>
          </div>

          <StepIndicator />

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="First Name *"
                      required
                    />
                    <User className={iconClasses} />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Last Name *"
                      required
                    />
                    <User className={iconClasses} />
                  </div>
                </div>

                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={inputClasses}
                    required
                  >
                    <option value="">Select Gender *</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  <Users className={iconClasses} />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Password *"
                    required
                    minLength={6}
                  />
                  <Lock className={iconClasses} />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Confirm Password *"
                    required
                  />
                  <Lock className={iconClasses} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Email Address *"
                    required
                  />
                  <Mail className={iconClasses} />
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Phone Number *"
                    required
                  />
                  <Phone className={iconClasses} />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Address Line 1 *"
                    required
                  />
                  <Home className={iconClasses} />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Address Line 2"
                  />
                  <Home className={iconClasses} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="City *"
                      required
                    />
                    <MapPin className={iconClasses} />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="State *"
                      required
                    />
                    <MapPin className={iconClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="ZIP Code *"
                      required
                    />
                    <MapPin className={iconClasses} />
                  </div>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={inputClasses}
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
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Occupation *"
                    required
                  />
                  <Briefcase className={iconClasses} />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Company Name"
                  />
                  <Building2 className={iconClasses} />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="gothram"
                    value={formData.gothram}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Gothram"
                  />
                  <Users className={iconClasses} />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Referred By (if any)"
                  />
                  <Users className={iconClasses} />
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                  <ChevronRight className="h-5 w-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`ml-auto px-8 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Complete Registration'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Snackbar {...snackbar} onClose={closeSnackbar} />
    </div>
  );
}

// Snackbar component
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
    success: <CheckCircle className="h-5 w-5 mr-2" />,
    error: <XCircle className="h-5 w-5 mr-2" />
  }[type];

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 p-4 ${bgColor} text-white rounded-lg shadow-lg flex items-center max-w-md mx-auto sm:mx-0 z-50`}
      onClick={onClose}
    >
      {icon}
      {message}
    </div>
  );
};


export default Registration;