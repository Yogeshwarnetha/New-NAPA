import { User2, Users, BookOpen, Radio, Heart, UserPlus, GraduationCap, Video } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/95" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700/30 rounded-full mb-6">
              <User2 className="w-4 h-4" />
              <span className="text-sm font-medium">President's Message</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Srinivas Sayini</h1>
            <p className="text-xl font-medium text-blue-200">President (2024-2025)</p>
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
                        src="https://res.cloudinary.com/dfhisjy9w/image/upload/v1730447036/Screenshot_20241017_174331_Gallery_i6wbxm.jpg"
                        alt="Srinivas Sayini"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent p-4">
                      <p className="text-white text-center font-medium">Srinivas Sayini</p>
                      <p className="text-blue-200 text-sm text-center">President (2024-2025)</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Dear NAPA Family,</h2>
                  <p className="text-gray-600 leading-relaxed">
                    I am deeply honored to serve as the President of NAPA, and I sincerely thank the NAPA
                    Advisory Council, the Executive team, and the entire NAPA family for their unanimous
                    support.
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  NAPA's vision is to bring all Padmashalis in North America and across the globe under
                  one umbrella, fostering community integration and providing services to our extended
                  families. Together, we aim to grow stronger both economically and socially.
                </p>

                <p>
                  As President of NAPA, I will continue to uphold the objectives of our previous presidents,
                  focusing on strengthening NAPA financially, increasing membership, and expanding the
                  number of chapters. I am committed to enhancing our existing services, such as
                  Matrimony and educational support, with a key focus on building a digital platform for
                  marketing weaving and other business products. This new and improved platform will also
                  provide comprehensive information on all committees, webinars, and other NAPA events.
                </p>
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