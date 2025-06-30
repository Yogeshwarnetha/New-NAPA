import React, { useState } from 'react';
import { Send, Loader2, Phone, Mail, Heart, Users, Globe } from 'lucide-react';
import { createContactus } from '../../apirequest/contactus';

interface ContactFormData {
    fullName: string;
    email: string;
    subject: string;
    message: string;
}

export function Contact() {
    const [data, setData] = useState<ContactFormData>({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createContactus(data);
            alert("Thank you for reaching out! We'll get back to you soon.");
        } catch (error) {
            console.error("Error submitting contact form:", error);
            alert("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const impactStats = [
        { icon: Users, label: 'Lives Touched', value: '50K+' },
        { icon: Heart, label: 'Projects Completed', value: '200+' },
        { icon: Globe, label: 'Communities Served', value: '100+' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <div className="py-12 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center py-12">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                            Join Our Mission
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                            Together, we can make a lasting impact. Reach out to learn how you can contribute to our cause.
                        </p>
                    </div>

                    {/* Impact Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 mt-12">
                        {impactStats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md">
                                <stat.icon className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                value={data.fullName}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm py-3 px-2"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={data.email}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm py-3 px-2"
                                            />
                                        </div>
                                    </div>
                                    {/* <div>
                                        <label htmlFor="involvement" className="block text-sm font-medium text-gray-700">
                                            How would you like to get involved?
                                        </label>
                                        <select
                                            id="involvement"
                                            name="involvement"
                                            value={formData.involvement}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm py-3 px-2"
                                        >
                                            <option value="">Select an option</option>
                                            <option value="volunteer">Volunteer</option>
                                            <option value="donate">Make a Donation</option>
                                            <option value="partner">Become a Partner</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div> */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={data.subject}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm py-3 px-2"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                            Your Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            value={data.message}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm py-3 px-2"
                                            placeholder="Share your thoughts or questions with us..."
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="-ml-1 mr-2 h-5 w-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Donation CTA */}
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow-xl p-8 text-white">
                                {/* <div className="flex items-center justify-center mb-6">
                                    <Heart className="h-12 w-12 text-pink-300" />
                                </div> */}
                                <h3 className="text-2xl font-bold text-center mb-4">Make a Difference Today</h3>
                                <p className="text-indigo-100 text-center mb-6">
                                    Your support can help us continue our mission to create positive change in communities worldwide.
                                </p>
                                <button className="w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                                    Donate Now
                                </button>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                                    <Heart className="h-5 w-5 text-pink-500" />
                                </div>
                                <div className="space-y-4">

                                    <div className="flex items-center">
                                        <Phone className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">Call Us</p>
                                            <p className="text-sm text-gray-600">+1 (555) 123-HOPE</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">Email Us</p>
                                            <p className="text-sm text-gray-600">help@hopefoundation.org</p>
                                        </div>
                                    </div>
                                    {/* <div className="flex items-start">
                                        <Clock className="h-6 w-6 text-indigo-600 mt-1 flex-shrink-0" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">Office Hours</p>
                                            <p className="text-sm text-gray-600">
                                                Monday - Friday: 9:00 AM - 6:00 PM<br />
                                                Saturday: 10:00 AM - 4:00 PM<br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}