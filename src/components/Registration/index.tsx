import { useState } from 'react';
import { User, Mail, Lock, Phone, Home, MapPin, Briefcase, Building2, Flag, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { signupUser } from '../../apirequest/auth';

function Registration() {
  const [step, setStep] = useState(1);
  const [snackbar, setSnackbar] = useState({ message: '', open: false });

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
    // profilePicture: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.[0]) {
  //     setFormData(prev => ({ ...prev, profilePicture: e.target.files![0] }));
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setSnackbar({ message: 'Passwords do not match.', open: true });
      return;
    }
  
    try {
      const response = await signupUser(formData);
  
      if (response.ok) {
        setSnackbar({ message: 'You have been successfully signed up. Please login.', open: true });
      } else {
        // Assuming the backend sends error messages in `error.message` or `error.error`
        const error = await response.json();
        setSnackbar({
          message: `Registration failed: ${error.message || error.error || 'Unknown error'}`,
          open: true,
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setSnackbar({ message: 'An error occurred. Please try again later.', open: true });
    }
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const inputClasses = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/50";
  const iconClasses = "absolute left-3 top-3.5 h-5 w-5 text-gray-400";

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-center space-x-4">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              step >= num ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Join Our Community</h2>
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
                  />
                  <Lock className={iconClasses} />
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

                {/* <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="profile-picture"
                  />
                  <label
                    htmlFor="profile-picture"
                    className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-blue-500 focus:outline-none"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {formData.profilePicture ? formData.profilePicture.name : 'Click to upload'}
                      </span>
                    </div>
                  </label>
                </div> */}
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
                    placeholder="Referred By"
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
                  className="ml-auto px-8 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

       {/* Snackbar */}
       {snackbar.open && (
        <div
          className="fixed bottom-4 left-4 p-4 bg-blue-600 text-white rounded-lg shadow-lg"
          onClick={closeSnackbar}
        >
          {snackbar.message}
        </div>
      )}

    </div>
  );
}

export default Registration;