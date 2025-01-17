import { Globe2, Users, GraduationCap, Heart, Building, Handshake } from 'lucide-react';

function Visionandmission() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-600/90" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-4">Vision & Mission</h1>
            <p className="text-xl opacity-90">Building a United Global Padmashali Community</p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                NAPA's Vision is to bring all Padmashalis in North America and across globe under one umbrella. Our core focus is to leverage a digital platform to bring the Padmashali community together and help to accelerate the process of community integration.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Globe2, title: 'Global Unity', desc: 'Connecting Padmashalis worldwide' },
                { icon: Users, title: 'Community Integration', desc: 'Fostering stronger bonds' },
                { icon: Building, title: 'Digital Platform', desc: 'Leveraging technology for connection' },
              ].map((item, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl mb-16 leading-relaxed">
              Unite Padmashalis across globe and leverage collective community strength to provide focused social services to our extended family members and provide a strong united voice for economic and social growth.
            </p>
          </div>
        </div>
      </section>

      {/* Community Development Programs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Community Development Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Heart, title: 'Marriage Support', desc: 'Assistance for wedding arrangements and ceremonies' },
              { icon: GraduationCap, title: 'Educational Support', desc: 'Scholarships and academic guidance' },
              { icon: Handshake, title: 'Skills Marketing', desc: 'Promoting traditional weaving expertise' },
              { icon: Globe2, title: 'Immigration Support', desc: 'Guidance for international transitions' },
            ].map((program, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <program.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                <p className="text-gray-600">{program.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-600 mb-8">
              Be part of our growing global network and help us strengthen the Padmashali community worldwide.
            </p>
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
              Get Involved
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Visionandmission;