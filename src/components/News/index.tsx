import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface NewsArticle {
  id: number;
  imageUrl: string;
  heading: string;
  date: string;
  time: string;
  venue: string;
  description: string;
}

const dummyNewsArticles: NewsArticle[] = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Tech Conference 2024",
    date: "2024-12-25",
    time: "10:00 AM",
    venue: "Silicon Valley Convention Center",
    description: "Join us for the largest tech conference of the year, featuring keynotes from industry leaders.",
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Annual Charity Run",
    date: "2024-11-18",
    time: "7:00 AM",
    venue: "Central Park",
    description: "Participate in the annual charity run to support local communities.",
  },
  {
    id: 3,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Art Exhibition",
    date: "2024-10-20",
    time: "5:00 PM",
    venue: "Downtown Art Gallery",
    description: "Explore stunning artworks from local and international artists.",
  },
  {
    id: 4,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Startup Pitch Fest",
    date: "2024-09-15",
    time: "3:00 PM",
    venue: "Tech Hub Auditorium",
    description: "Watch innovative startups pitch their ideas to top investors.",
  },
  {
    id: 5,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Music Festival",
    date: "2024-08-10",
    time: "12:00 PM",
    venue: "City Stadium",
    description: "Enjoy live performances from popular bands and solo artists.",
  },
  {
    id: 6,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Book Fair 2024",
    date: "2024-07-05",
    time: "10:00 AM",
    venue: "Exhibition Hall A",
    description: "Discover new books and meet your favorite authors.",
  },
  {
    id: 7,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Science Workshop",
    date: "2024-06-22",
    time: "9:00 AM",
    venue: "Community Center",
    description: "Participate in hands-on science experiments and learn from experts.",
  },
  {
    id: 8,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Coding Hackathon",
    date: "2024-05-15",
    time: "8:00 AM",
    venue: "Tech Lab",
    description: "Compete in a 24-hour coding challenge with top prizes.",
  },
  {
    id: 9,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Food Carnival",
    date: "2024-04-18",
    time: "4:00 PM",
    venue: "City Square",
    description: "Taste delicious cuisines from around the world.",
  },
  {
    id: 10,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Film Screening",
    date: "2024-03-10",
    time: "7:30 PM",
    venue: "Open Air Theater",
    description: "Watch the premiere of a highly anticipated movie.",
  },
  {
    id: 11,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Fashion Show",
    date: "2024-02-12",
    time: "6:00 PM",
    venue: "Luxury Hotel Ballroom",
    description: "Experience the latest trends in fashion by renowned designers.",
  },
  {
    id: 12,
    imageUrl: "https://via.placeholder.com/400x250",
    heading: "Yoga Retreat",
    date: "2024-01-20",
    time: "8:00 AM",
    venue: "Mountain Resort",
    description: "Rejuvenate your mind and body with a guided yoga retreat.",
  },
];

const NewsSection = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  const recentArticles = dummyNewsArticles
    .filter((article) => article.id !== selectedArticle?.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {selectedArticle ? (
        <div className="flex flex-col lg:flex-row lg:gap-0 py-32 px-6 lg:px-8">
          <div className="lg:w-3/4 bg-white rounded-lg overflow-hidden">
            <button
              onClick={handleBackClick}
              className="p-4 text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to News
            </button>
            <div className="relative h-72 lg:h-[450px]">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.heading}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-indigo-600 mb-2">{selectedArticle.date}</p>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedArticle.heading}</h1>
              <p className="text-gray-700 mb-2">{selectedArticle.venue}</p>
              <p className="text-gray-700">{selectedArticle.description}</p>
            </div>
          </div>

          <div className="lg:w-1/4 bg-[#f9fafb] rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent News</h2>
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow hover:shadow-md p-4 flex items-center gap-4 cursor-pointer transition"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={article.imageUrl}
                      alt={article.heading}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{article.heading}</p>
                    <p className="text-xs text-gray-500">{article.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-36 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest News</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dummyNewsArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 cursor-pointer"
                >
                  <div className="relative h-48">
                    <img
                      src={article.imageUrl}
                      alt={article.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-indigo-600 mb-2">{article.date}</p>
                    <h3 className="text-lg font-semibold text-gray-900">{article.heading}</h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
