"use client";
import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, Loader } from 'lucide-react';
import { loginAdmin, resendEmailOtp } from '../../apirequest/adminAuth';
import Cookies from "js-cookie";

const AdminLogin = () => {
  const [step, setStep] = useState<1 | 2>(1); // 1 = email/password, 2 = OTP
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    emailOtp: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState('');
  const [resending, setResending] = useState(false);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.emailOtp) {
      newErrors.emailOtp = 'Email OTP is required';
    } else if (!/^\d{6}$/.test(formData.emailOtp)) {
      newErrors.emailOtp = 'OTP must be a 6-digit number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;
    setIsLoading(true);

    try {
      const response = await loginAdmin({
        email: formData.email,
        password: formData.password,
      });

      if (response?.needsEmailOtpVerification) {
        setStep(2);
      } else if (response?.token) {
          Cookies.set("adminAuthToken", response.token, {
          expires: 1,
          secure: process.env.NODE_ENV === "production",
          sameSite: 'strict'
        });
        window.location.href = "/admin";
      } else {
        setErrors({ general: "Invalid credentials. Please try again." });
      }
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setIsLoading(true);

    try {
      const response = await loginAdmin({
        email: formData.email,
        password: formData.password,
        emailOtp: formData.emailOtp,
      });

      if (response?.token) {
          Cookies.set("adminAuthToken", response.token, {
          expires: 1,
          secure: process.env.NODE_ENV === "production",
          sameSite: 'strict'
        });
        window.location.href = "/admin";
      } else {
        setErrors({ general: "Invalid OTP code." });
      }
    } catch (error) {
      setErrors({ general: 'OTP verification failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleResendOtp = async () => {
    setResending(true);
    setResendStatus('');
    try {
      const result = await resendEmailOtp(formData.email);
      setResendStatus(result.message || "OTP resent successfully.");
    } catch (error: any) {
      setResendStatus("Failed to resend OTP. Try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="px-6 sm:px-8 py-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
                <Lock className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">NAPA Admin</h2>
              <p className="mt-2 text-gray-600">
                {step === 1
                  ? 'Welcome back! Please sign in to continue.'
                  : 'Enter the OTP sent to your email'}
              </p>
            </div>

            <form onSubmit={step === 1 ? handleStep1Submit : handleStep2Submit} className="space-y-6">
              {step === 1 ? (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="admin@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.password}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="emailOtp" className="block text-sm font-medium text-gray-700">Email OTP</label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="emailOtp"
                        name="emailOtp"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        value={formData.emailOtp}
                        onChange={handleChange}
                        className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.emailOtp ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Enter OTP from email"
                        maxLength={6}
                      />
                    </div>
                    {errors.emailOtp && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.emailOtp}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resending}
                      className="text-sm text-indigo-600 hover:underline focus:outline-none"
                    >
                      {resending ? "Sending..." : "Resend OTP"}
                    </button>
                    {resendStatus && (
                      <p className="text-sm text-gray-500 ml-2">{resendStatus}</p>
                    )}
                  </div>
                </>
              )}

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center text-red-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">{errors.general}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    {step === 1 ? 'Signing in...' : 'Verifying OTP...'}
                  </>
                ) : (
                  step === 1 ? 'Sign in' : 'Verify OTP'
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <Lock className="h-4 w-4 mr-1" />
              <span>Secure login with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
