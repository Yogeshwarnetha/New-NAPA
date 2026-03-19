import axios from 'axios';
import { origin } from './config';

// Get user profile
export const getUserProfile = async (token: string) => {
    try {
        const response = await axios.get(`${origin}/api/v1/user/profile`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
        });
        return {
            success: true,
            user: response.data.user,
        };
    } catch (err: any) {
        let errorMessage = 'Failed to fetch user profile';
        if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
            errorMessage = err.message;
        }
        return {
            success: false,
            message: errorMessage,
        };
    }
};

// Update user profile
export const updateUserProfile = async (token: string, data: any) => {
    try {
        let payload: FormData | any = data;
        let contentType = 'application/json';

        if (data.profileImageFile instanceof File) {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (key === 'profileImageFile') {
                    formData.append('profileImage', data.profileImageFile);
                } else if (data[key] !== undefined && data[key] !== null) {
                    formData.append(key, data[key]);
                }
            });
            payload = formData;
            contentType = 'multipart/form-data';
        }

        const response = await axios.put(`${origin}/api/v1/user/profile`, payload, {
            headers: {
                'Content-Type': contentType,
                Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
        });
        return {
            success: true,
            user: response.data.user,
            message: response.data.message,
        };
    } catch (err: any) {
        let errorMessage = 'Failed to update profile';
        if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
            errorMessage = err.message;
        }
        return {
            success: false,
            message: errorMessage,
        };
    }
};

// Update password
export const updatePassword = async (
    token: string,
    data: {
        currentPassword?: string;
        newPassword: string;
        confirmPassword: string;
    }
) => {
    try {
        const response = await axios.put(`${origin}/api/v1/user/update-password`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
        });
        return {
            success: true,
            message: response.data.message,
        };
    } catch (err: any) {
        let errorMessage = 'Failed to update password';
        if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
            errorMessage = err.message;
        }
        return {
            success: false,
            message: errorMessage,
        };
    }
};

// Check if profile is complete
export const checkProfileComplete = async (token: string) => {
    try {
        const response = await axios.get(`${origin}/api/v1/user/profile/complete`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
        });
        return {
            success: true,
            isComplete: response.data.isComplete,
            missingFields: response.data.missingFields,
            authProvider: response.data.authProvider,
            hasPassword: response.data.hasPassword,
        };
    } catch (err: any) {
        let errorMessage = 'Failed to check profile status';
        if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
            errorMessage = err.message;
        }
        return {
            success: false,
            message: errorMessage,
        };
    }
};

// Delete account
export const deleteAccount = async (token: string) => {
    try {
        const response = await axios.delete(`${origin}/api/v1/user/profile`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
        });
        return {
            success: true,
            message: response.data.message,
        };
    } catch (err: any) {
        let errorMessage = 'Failed to delete account';
        if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
            errorMessage = err.message;
        }
        return {
            success: false,
            message: errorMessage,
        };
    }
};

// Initiate Google OAuth
export const loginWithGoogle = () => {
    window.location.href = `${origin}/api/v1/oauth/google`;
};

// Initiate Microsoft OAuth
export const loginWithMicrosoft = () => {
    window.location.href = `${origin}/api/v1/oauth/microsoft`;
};
