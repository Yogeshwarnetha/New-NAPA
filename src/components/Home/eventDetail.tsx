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
    const otherEvents = eventData.filter((e: any) => e.id !== Number(id));

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
                            className="w-full h-[500px] object-contain"
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

                {/* Other Events Section */}
                {otherEvents.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Events You Might Like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherEvents.map((otherEvent) => (
                                <div key={otherEvent.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <Link to={`/event/${otherEvent.id}`}>
                                        {otherEvent.images && otherEvent.images.length > 0 ? (
                                            <img
                                                src={otherEvent.images[0]}
                                                alt={otherEvent.name}
                                                className="w-full h-48 object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500">No Image Available</span>
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{otherEvent.name}</h3>
                                            <div className="flex items-center text-gray-600 text-sm mb-1">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>{new Date(otherEvent.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span>{otherEvent.place}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};