import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../../apirequest/auth';
import { Alert, Snackbar, CircularProgress } from '@mui/material';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import loginImage from '../../Images/logo-main.png';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [resetToken, setResetToken] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Get email and reset token from navigation state
        const stateEmail = location.state?.email || '';
        const stateResetToken = location.state?.resetToken || '';
        
        if (!stateEmail || !stateResetToken) {
            navigate('/forgot-password');
        }
        
        setEmail(stateEmail);
        setResetToken(stateResetToken);
    }, [location, navigate]);

    const validatePassword = (password: string) => {
        const errors = [];
        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate passwords
        if (newPassword !== confirmPassword) {
            setSnackbarMessage('Passwords do not match');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }
        
        const passwordErrors = validatePassword(newPassword);
        if (passwordErrors.length > 0) {
            setSnackbarMessage(passwordErrors.join('. '));
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);

        try {
            const result = await resetPassword(email, resetToken, newPassword, confirmPassword);
            
            if (result.success) {
                setSnackbarMessage(result.message || 'Password reset successful!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                
                // Redirect to login page after successful reset
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setSnackbarMessage(result.message || 'Password reset failed');
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

    const handleBack = () => {
        navigate(-1);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                {/* Back Button */}
                <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center text-indigo-600 hover:text-indigo-700 mb-3"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back
                </button>

                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center">
                        <img src={loginImage} style={{width:250, height:150, objectFit:'fill'}} alt="Logo" />
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">Reset Password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Create a new password for your account
                    </p>
                </div>

                {/* Password Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="block w-full pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    autoComplete="new-password"
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            <span className="text-xs text-gray-500">Must be at least 6 characters with uppercase, lowercase, and numbers</span>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    autoComplete="new-password"
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
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
                            'Reset Password'
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

export default ResetPassword;