import { Globe2, Users, GraduationCap, Heart, Building, Handshake } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchAboutMissionVision } from '../../apirequest/aboutmissionvision'; // adjust the path as needed
import { AboutMissionVision } from '../../apirequest/aboutmissionvision';


function Visionandmission() {
  const [content, setContent] = useState<AboutMissionVision | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchAboutMissionVision();
        setContent(data);
      } catch (error) {
        console.error("Failed to load Vision & Mission content", error);
      }
    };
    loadContent();
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading content...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[400px] md:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://pub-574f17e68e8b4496895a0c5ef79b3096.r2.dev/Mission%20and%20vision.png")',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-xl md:text-5xl font-bold mb-4">{content.missionvision_heading}</h1>
            <p className="text-md md:text-xl opacity-90">{content.missionvision_description}</p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">{content.vision_mainHeading}</h2>
              <p className="text-sm md:text-xl text-gray-600 leading-relaxed text-justify">
                {content.vision_para1}
              </p>
              <p className="text-sm md:text-xl text-gray-600 leading-relaxed text-justify">
                {content.vision_para2}
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
      <section className="py-10 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl md:text-3xl font-bold mb-6">{content.mission_mainHeading}</h2>
            <p className="text-sm md:text-lg  leading-relaxed ">
              {content.mission_para1}
            </p>
            <p className="text-sm md:text-lg  leading-relaxed ">
              {content.mission_para2}
            </p>
          </div>
        </div>
      </section>

      {/* Community Development Programs */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-lg md:text-3xl font-bold text-center mb-8 md:mb-12">Community Development Programs</h2>
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
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-md md:text-lg text-gray-600 mb-8">
              {content.joinourcommunity}            </p>

            <a href='/register'>
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                Get Involved
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Visionandmission;