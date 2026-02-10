import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyResetOTP } from '../../apirequest/auth';
import { Alert, Snackbar, CircularProgress } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import loginImage from '../../Images/logo-main.png';

const VerifyResetOTP = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [email, setEmail] = useState('');
    const [timer, setTimer] = useState(600); // 10 minutes in seconds
    const [canResend, setCanResend] = useState(false);
    
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Get email from navigation state or fallback
        const stateEmail = location.state?.email || '';
        setEmail(stateEmail);
        
        if (!stateEmail) {
            navigate('/forgot-password');
        }
    }, [location, navigate]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        
        if (otpCode.length !== 6) {
            setSnackbarMessage('Please enter a valid 6-digit OTP');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);

        try {
            const result = await verifyResetOTP(email, otpCode);
            
            if (result.success && result.resetToken) {
                setSnackbarMessage(result.message || 'OTP verified successfully');
                setSnackbarSeverity('success');
                
                // Redirect to reset password page
                navigate('/reset-password', {
                    state: {
                        email: email,
                        resetToken: result.resetToken
                    }
                });
            } else {
                setSnackbarMessage(result.message || 'Invalid OTP');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error: any) {
            setSnackbarMessage(error.message || 'Verification failed');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleResendOTP = async () => {
        // You can implement resend logic here or navigate back to forgot password
        navigate('/forgot-password', { state: { email } });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleBack = () => {
        navigate('/forgot-password');
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
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">Verify OTP</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter the 6-digit OTP sent to {email}
                    </p>
                </div>

                {/* Timer */}
                <div className="text-center mt-2">
                    <span className="text-sm text-gray-500">OTP expires in: {formatTime(timer)}</span>
                </div>

                {/* OTP Input Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-2 mb-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                maxLength={1}
                                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                style={{ padding: '10px' }}
                                inputMode="numeric"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Verify OTP'
                        )}
                    </button>

                    <div className="text-center mt-2">
                        {canResend ? (
                            <button
                                type="button"
                                onClick={handleResendOTP}
                                className="text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                Resend OTP
                            </button>
                        ) : (
                            <span className="text-sm text-gray-500">
                                Resend OTP available in {formatTime(timer)}
                            </span>
                        )}
                    </div>
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

export default VerifyResetOTP;