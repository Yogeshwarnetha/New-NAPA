import React, { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import loginImage from '../../Images/logo-main.png';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../apirequest/auth';
import { Alert, Snackbar, CircularProgress } from '@mui/material';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await forgotPassword(email);
            
            if (result.success) {
                setSnackbarMessage(result.message || 'OTP sent to your email');
                setSnackbarSeverity('success');
                
                // Redirect to OTP verification page
                navigate('/verify-reset-otp', { 
                    state: { email: email } 
                });
            } else {
                setSnackbarMessage(result.message || 'Failed to send OTP');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error: any) {
            setSnackbarMessage(error.message || 'An error occurred. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                {/* Back Button */}
                <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="flex items-center text-indigo-600 hover:text-indigo-700 mb-3"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back to Login
                </button>

                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center">
                        <img src={loginImage} style={{width:250, height:150, objectFit:'fill'}} alt="Logo" />
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">Forgot Password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your email address and we'll send you an OTP to reset your password
                    </p>
                </div>

                {/* Email Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
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
                                    autoFocus
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Send OTP'
                        )}
                    </button>
                </form>
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
        </div>
    );
};

export default ForgotPasswordPage;