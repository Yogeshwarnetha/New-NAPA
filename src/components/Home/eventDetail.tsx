import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { fetchEvents } from '../../apirequest/events';

interface EventData {
    id?: number;
    name: string;
    description: string;
    date: Date;
    time: string;
    place: string;
    images: string[];
}
export const EventDetailPage: React.FC = () => {
    const [eventData, setEventData] = useState<EventData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchEvents();
                setEventData(data.data);
            } catch (error) {
                console.error("Failed to fetch banners:", error);
            }
        };
        fetchData();
    }, []);


    const { id } = useParams<{ id: string }>();
    const event = eventData.find((e: any) => e.id === Number(id));

    if (!event) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
                    <Link to="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
                        Return to Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Events
                </Link>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {event.images && event.images.length > 0 ? (
                        <img
                            src={event.images[0]}
                            alt={event.name}
                            className="w-full h-auto object-contain"
                        />
                    ) : (
                        <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image Available</span>
                        </div>
                    )}


                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">{event.name}</h1>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center text-gray-600">
                                <Calendar className="w-5 h-5 mr-3" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Clock className="w-5 h-5 mr-3" />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <MapPin className="w-5 h-5 mr-3" />
                                <span>{event.place}</span>
                            </div>
                        </div>

                        <div className="prose max-w-none">
                            <h2 className="text-xl font-semibold mb-4">About this Event</h2>
                            <p className="text-gray-700">{event.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};