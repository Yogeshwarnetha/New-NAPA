import { Users, Heart, Handshake, Globe, Sparkles, Shield, Clock, Award, Building, Globe2, GraduationCap } from 'lucide-react';

const Visionandmission = () => {
  const milestones = [
    {
      year: '1980',
      title: 'Foundation',
      description: 'Established to serve and unite the Nepalese American community',
      icon: Building
    },
    {
      year: '1995',
      title: 'National Expansion',
      description: 'Expanded our reach across multiple states in America',
      icon: Award
    },
    {
      year: '2010',
      title: 'Modern Era',
      description: 'Embraced digital transformation to better serve our community',
      icon: Clock
    }
  ];

  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Active Members',
      description: 'Across United States'
    },
    {
      icon: Globe2,
      value: '50+',
      label: 'Chapters',
      description: 'Nationwide presence'
    },
    {
      icon: GraduationCap,
      value: '1,000+',
      label: 'Scholarships',
      description: 'Awarded to students'
    },
    {
      icon: Heart,
      value: '$2M+',
      label: 'Community Support',
      description: 'Raised for causes'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 transform -skew-y-6"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <Users className="h-20 w-20 mx-auto mb-8 text-indigo-600 animate-pulse" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Building a Stronger Community Together
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uniting and empowering Nepalese Americans through cultural preservation, education, and community service
          </p>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Vision Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-indigo-600">Our Vision</h2>
                <Sparkles className="h-8 w-8 text-indigo-600" />
              </div>
              <p className="text-gray-600 mb-8">
                To be the leading organization fostering unity, cultural preservation, and advancement of Nepalese Americans while contributing to the diverse fabric of American society.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Heart,
                    title: 'Cultural Heritage',
                    description: 'Preserving and promoting Nepalese traditions and values'
                  },
                  {
                    icon: Globe,
                    title: 'Global Connection',
                    description: 'Building bridges between Nepal and America'
                  }
                ].map((item) => (
                  <div key={item.title} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600">
                        <item.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-purple-600">Our Mission</h2>
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-gray-600 mb-8">
                To empower Nepalese Americans through education, cultural programs, and community service while fostering leadership and professional development.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Handshake,
                    title: 'Community Development',
                    description: 'Supporting educational and professional growth'
                  },
                  {
                    icon: Users,
                    title: 'Cultural Exchange',
                    description: 'Promoting understanding between cultures'
                  }
                ].map((item) => (
                  <div key={item.title} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600">
                        <item.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Journey Through Time
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={milestone.year} className={`relative ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}>
                    <div className={`flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'} w-full mx-auto`}>
                      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center mb-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                              <Icon className="h-6 w-6 text-indigo-600" />
                            </div>
                            <span className="ml-4 text-2xl font-bold text-indigo-600">{milestone.year}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Community Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="bg-indigo-50 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
                    <h3 className="text-xl font-semibold text-gray-900 mt-2">{stat.label}</h3>
                    <p className="text-gray-500 mt-1">{stat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Impact Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="text-lg opacity-90">
              Be part of a vibrant community that celebrates our heritage while building a brighter future together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visionandmission;