import { Heart, GraduationCap, Handshake, Landmark, Users, Target } from 'lucide-react';

const AboutusIntroduction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <div
        className="relative h-[600px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1537365587684-f490102e1225?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <div className="inline-block px-6 py-2 border-2 border-amber-400 text-amber-400 text-sm font-semibold mb-8 rounded-full">
                SERVING SINCE 1995
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
                Weaving Dreams, <br />
                <span className="text-amber-400">Enriching Lives</span>
              </h1>
              <p className="text-base md:text-xl opacity-90 leading-relaxed">
                The Padmashali Foundation stands as a beacon of hope, preserving our rich textile heritage
                while empowering our community through education, cultural preservation, and social development.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="relative md:-mt-20 mt-5 mb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <Users />, number: "10,000+", label: "Community Members" },
              { icon: <GraduationCap />, number: "500+", label: "Scholarships Awarded" },
              { icon: <Handshake />, number: "50+", label: "Partner Organizations" },
              { icon: <Heart />, number: "1000+", label: "Families Supported" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl p-6 transform hover:-translate-y-2 transition-all"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 text-amber-600 mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-xl md:text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* About Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8">
            Preserving Heritage, Building Future
          </h2>
          <p className="text-sm md:text-xl text-gray-600 leading-relaxed mb-8">
            The Padmashali community represents one of India's most ancient and respected
            weaving traditions. Our foundation works tirelessly to preserve this rich cultural
            heritage while ensuring our community members thrive in the modern world.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <Target className="w-8 h-8 text-emerald-500" />,
              title: "Educational Support",
              description:
                "Providing scholarships and educational resources to empower the next generation",
            },
            {
              icon: <Landmark className="w-8 h-8 text-blue-500" />,
              title: "Cultural Preservation",
              description:
                "Documenting and preserving traditional weaving techniques and cultural practices",
            },
            {
              icon: <Heart className="w-8 h-8 text-rose-500" />,
              title: "Community Welfare",
              description:
                "Supporting families through healthcare and social welfare initiatives",
            },
          ].map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="mb-6">{program.icon}</div>
              <h3 className="text-lg md:text-2xl font-semibold text-gray-800 mb-4">{program.title}</h3>
              <p className="text-sm md:text-base text-gray-600">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutusIntroduction;
