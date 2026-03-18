import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CheckCircle, AlertCircle } from 'lucide-react';

const OAuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [message, setMessage] = useState('Processing authentication...');

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (error) {
            setStatus('error');
            setMessage('Authentication failed. Please try again.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
            return;
        }

        if (token) {
            const isProduction = import.meta.env.PROD;
            
            // Store token in cookie
            Cookies.set('authToken', token, {
                expires: 7,
                secure: isProduction,
                sameSite: 'strict',
            });

            setStatus('success');
            setMessage('Successfully authenticated!');

            // Always land on home after OAuth success.
            setTimeout(() => {
                navigate('/');
                window.location.reload();
            }, 2000);
        } else {
            setStatus('error');
            setMessage('No authentication token received.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center">
                {status === 'processing' && (
                    <div className="space-y-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                        <h2 className="text-2xl font-bold text-gray-900">{message}</h2>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-4">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-900">{message}</h2>
                        <p className="text-gray-600">Redirecting you...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-4">
                        <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-900">{message}</h2>
                        <p className="text-gray-600">Redirecting to login...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OAuthSuccess;
