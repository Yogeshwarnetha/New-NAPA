import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import loginImage from '../../Images/logo-main.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUnified } from '../../apirequest/auth';
import { resendEmailOtp } from '../../apirequest/adminAuth';
import { Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [roleOptions, setRoleOptions] = useState<Array<'admin' | 'user'>>([]);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();
  const location = useLocation();

  const redirectParam = new URLSearchParams(location.search).get('redirect');
  const adminRedirect = redirectParam && redirectParam.startsWith('/admin') ? redirectParam : '/admin';
  const userRedirect = redirectParam && !redirectParam.startsWith('/admin') ? redirectParam : '/';

  const handleLoginSuccess = (role: 'admin' | 'user', token: string) => {
    const isProduction = import.meta.env.PROD;
    if (role === 'admin') {
      Cookies.set('adminAuthToken', token, {
        expires: 1,
        secure: isProduction,
        sameSite: 'strict'
      });
      navigate(adminRedirect);
    } else {
      Cookies.set('authToken', token, {
        expires: 1,
        secure: isProduction,
        sameSite: 'strict'
      });
      navigate(userRedirect);
    }
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        setIsLoading(true);
        const response = await loginUnified({ email, password });

        if (response?.needsRoleSelection) {
            setRoleOptions(response.roles || ['admin', 'user']);
            setShowRoleModal(true);
            return;
        }

        if (response?.needsEmailOtpVerification) {
            setStep(2);
            setSnackbarMessage('OTP sent to your email');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            return;
        }

        if (response?.token && response?.role) {
            setSnackbarMessage('Successfully logged in');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            handleLoginSuccess(response.role, response.token);
        }
    } catch (error) {
        setSnackbarMessage('Login failed. Please check your credentials.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    } finally {
        setIsLoading(false);
    }
  };

  const handleRoleSelect = async (role: 'admin' | 'user') => {
    setShowRoleModal(false);
    setIsLoading(true);

    try {
      const response = await loginUnified({ email, password, role });

      if (response?.needsEmailOtpVerification) {
        setStep(2);
        setSnackbarMessage('OTP sent to your email');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        return;
      }

      if (response?.token) {
        setSnackbarMessage('Successfully logged in');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleLoginSuccess(role, response.token);
      }
    } catch (error) {
      setSnackbarMessage('Login failed. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await loginUnified({
        email,
        password,
        role: 'admin',
        emailOtp,
      });

      if (response?.token) {
        setSnackbarMessage('Successfully logged in');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleLoginSuccess('admin', response.token);
      } else {
        setSnackbarMessage('Invalid OTP. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('OTP verification failed. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendStatus('');
      await resendEmailOtp(email);
      setResendStatus('OTP resent successfully.');
    } catch (error) {
      setResendStatus('Failed to resend OTP. Try again.');
    }
  };


  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <img src={loginImage} style={{width:250, height:150, objectFit:'fill'}}/>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our community of innovators and creators
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={step === 1 ? handleSubmit : handleOtpSubmit}>
          <div className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="emailOtp" className="block text-sm font-medium text-gray-700">
                    Email OTP
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="emailOtp"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      required
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter OTP from email"
                      maxLength={6}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Resend OTP
                  </button>
                  {resendStatus && <span className="text-xs text-gray-500">{resendStatus}</span>}
                </div>

                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => setStep(1)}
                >
                  Back to login
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60"
          >
            {isLoading ? 'Please wait...' : step === 1 ? 'Sign in' : 'Verify OTP'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

        </form>

        <p className="text-center text-sm text-gray-600">
          Not a member?{' '}
          <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Start your journey today
          </a>
        </p>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={showRoleModal} onClose={() => setShowRoleModal(false)}>
        <DialogTitle>Select Login Type</DialogTitle>
        <DialogContent>
          <p className="text-sm text-gray-600">This email exists for both Admin and User. Choose how you want to log in.</p>
        </DialogContent>
        <DialogActions>
          {roleOptions.includes('user') && (
            <Button onClick={() => handleRoleSelect('user')} variant="outlined">
              Login as User
            </Button>
          )}
          {roleOptions.includes('admin') && (
            <Button onClick={() => handleRoleSelect('admin')} variant="contained">
              Login as Admin
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
    </div>
  );
};

export default LoginPage;