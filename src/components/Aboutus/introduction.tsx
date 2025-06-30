import { Users, Globe, Building, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchAboutIntroduction } from '../../apirequest/aboutIntroduction';

interface AboutIntroduction {
  introduction_heading: string;
  introduction_description: string;
  introduction_mainHeading: string;
  introduction_para1: string;
  introduction_para2: string;
  napa_story_para1: string;
  napa_story_para2: string;
}

function AboutusIntroduction() {
  const [data, setData] = useState<AboutIntroduction | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchAboutIntroduction();
        setData(res);
      } catch (err) {
        console.error('Failed to fetch about introduction:', err);
      }
    };
    getData();
  }, []);

  if (!data) return <div className="text-center py-20">Loading content...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[300px] md:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-xl md:text-5xl font-bold mb-4">{data.introduction_heading}</h1>
            <p className="text-md md:text-xl opacity-90">{data.introduction_description}</p>
          </div>
        </div>
      </div>

      {/* Heritage Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="md:max-w-7xl mx-auto px-2 md:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">{data.introduction_mainHeading}</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6 leading-8 text-justify">
                {data.introduction_para1}
              </p>
              <p className="mb-6 leading-8 text-justify">
                {data.introduction_para2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Global Presence</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: 'Global Reach', desc: 'Strong presence across India, USA, and Canada' },
              { icon: Users, title: 'Growing Community', desc: 'Vibrant diaspora across North America' },
              { icon: Building, title: 'Strong Foundation', desc: 'Established presence in multiple states' },
              { icon: GraduationCap, title: 'Professional Success', desc: 'Excellence across various fields' },
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAPA Story */}
      <section className="py-10 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl md:text-3xl font-bold mb-8">The NAPA Story</h2>
            <p className="mb-6 leading-8 text-center">
              {data.napa_story_para1}
            </p>
            <p className="mb-6 leading-8 text-center">
              {data.napa_story_para2}
            </p>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '12%', label: 'Population in AP & Telangana' },
              { number: '1000+', label: 'Families in North America' },
              { number: '50+', label: 'Years of Heritage' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-gray-50">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutusIntroduction;