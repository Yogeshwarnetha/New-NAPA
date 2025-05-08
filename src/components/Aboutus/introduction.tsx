import { Users, Globe, Building, GraduationCap } from 'lucide-react';

function AboutusIntroduction() {
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
            <h1 className="text-xl md:text-5xl font-bold mb-4">North American Padmashali Association</h1>
            <p className="text-md md:text-xl opacity-90">Preserving Our Heritage, Building Our Future</p>
          </div>
        </div>
      </div>

      {/* Heritage Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="md:max-w-7xl mx-auto px-2 md:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">Our Rich Heritage</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6 leading-8 text-justify">
                Padmashalis are a Telugu speaking community with roots tracing back to Markandeya Maharishi. We are the third largest community and form 12% of the population of Andhra Pradesh and Telangana. Our community also has a large presence across India, including Maharashtra and Gujarat. Padmashalis are traditionally a weaving and artisan community but over time, many members from our community have successfully moved into modern professions. As a result, our community spread all over the world, including the United States of America and Canada.
              </p>
              <p className="mb-6 leading-8 text-justify">
                There was strong passion and zeal among US residents to reunite our family ties. This idea sparked the establishment of a strong and vibrant platform, <span className='font-semibold	'>“North American Padmashali Association” (NAPA)</span>, non-profit organization for Padmashalis. The goal of the NAPA is to build a strong vibrant community-based platform in North America to not only help ourselves locally in North America, but also help our extended family members who reside across the globe. The organization’s goals are not just limited to education, economics and social services, but we want to act as a catalyst to groom economically self-reliant citizens who can support their families and the greater community when it is required most.
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
            <p className="text-md md:text-lg leading-relaxed mb-8 text-justify md:text-center">
              Born from a strong passion among US residents to reunite our family ties, the North American Padmashali Association (NAPA) emerged as a vibrant platform for our community. As a non-profit organization, NAPA serves as a bridge connecting Padmashalis across North America while extending support to our global community.
            </p>
            <p className="text-md md:text-lg leading-relaxed text-justify md:text-center">
              Our organization goes beyond traditional community service, focusing on creating economically self-reliant citizens who can support both their families and the greater community. Through education, economic empowerment, and social services, NAPA continues to strengthen our community bonds and create lasting impact.
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