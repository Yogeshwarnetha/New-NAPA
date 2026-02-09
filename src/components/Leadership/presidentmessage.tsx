import { User2, Users, BookOpen, Radio, Heart, UserPlus, GraduationCap, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchPresidentMessage } from '../../apirequest/presidentMessage';


interface PresidentMessage {
  president_name: string;
  president_period: string;
  president_description1: string;
  president_description2: string;
  president_description3: string;
  image_url: string;
}

function PresidentMessageMain() {
  const committees = [
    { icon: Heart, name: "Matrimony Committee" },
    { icon: BookOpen, name: "Educational Committee" },
    { icon: Radio, name: "Web and Media Committee" },
    { icon: Users, name: "Cultural & Spiritual Committee" },
    { icon: UserPlus, name: "Membership Committee" },
    { icon: GraduationCap, name: "Students and Youth Committee" },
    { icon: Video, name: "Webinars Committee" }
  ];

  const [message, setMessage] = useState<PresidentMessage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const data = await fetchPresidentMessage();
        setMessage(data);
      } catch (error) {
        console.error("Failed to fetch president message:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMessage();
  }, []);
  if (loading) {
    return <div className="text-center py-20 text-blue-600 font-semibold">Loading President Message...</div>;
  }

  if (!message) {
    return <div className="text-center py-20 text-red-600 font-semibold">Failed to load president message.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[400px] md:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://pub-574f17e68e8b4496895a0c5ef79b3096.r2.dev/President%20message.png")',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700/30 rounded-full mb-6">
              <User2 className="w-4 h-4" />
              <span className="text-sm font-medium">President's Message</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">{message.president_name}</h1>
            <p className="text-xl font-medium text-blue-200">President ({message.president_period})</p>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* President's Image and Introduction */}
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-1/3">
                  <div className="relative">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden">
                      <img
                        src={message.image_url}
                        alt={message.president_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent p-4">
                      <p className="text-white text-center font-medium">{message.president_name}</p>
                      <p className="text-blue-200 text-sm text-center">President ({message.president_period})</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Dear NAPA Family,</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {message.president_description1}
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>{message.president_description2}</p>
                <p>{message.president_description3}</p>
              </div>

              {/* Committees Section */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Committees Dedicated to Serving Our Community
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {committees.map((committee, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg"
                    >
                      <committee.icon className="w-6 h-6 text-blue-600" />
                      <span className="text-gray-700 font-medium">{committee.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Banner */}
      <div className="bg-blue-900 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <p className="text-lg">
              Have questions or suggestions? Feel free to reach out to us at{' '}
              <a href="mailto:president@napa.org" className="font-semibold hover:underline">
                president@napa.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresidentMessageMain;