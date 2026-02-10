import { ArrowRight } from 'lucide-react';

const Ourcompany = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
          Welcome to{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            NAPA
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* About Us Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 transform hover:scale-[1.02] transition-transform bg-gradient-to-br from-white to-indigo-50">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 border-b border-indigo-100 pb-2 sm:pb-4">
              About Us
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Padmashalis are a Telugu speaking community with roots tracing back to Markandeya Maharishi.
                We are the third largest community and form 12% of the population of Andhra Pradesh and Telangana.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Our community also has a large presence across India, including Maharashtra and Gujarat.
                Padmashalis are traditionally a weaving and artisan community but over time, many members
                from our community have successfully moved into modern professions.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                As a result, our community spread all over the world, including the United States of America and Canada.
              </p>
            </div>
            <div className="mt-6 sm:mt-8">
              <a href='/introduction'>
              <button className="inline-flex items-center bg-[#43529C] text-white px-3 sm:px-4 py-2 text-sm font-medium hover:bg-[#32408f] transition-colors">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              </a>
            </div>
          </div>

          {/* President's Message Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 transform hover:scale-[1.02] transition-transform bg-gradient-to-br from-white to-indigo-50">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 border-b border-indigo-100 pb-2 sm:pb-4">
              President's Message
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start mb-6 sm:mb-8 gap-4">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-75"></div>
                <img
                  src="https://res.cloudinary.com/dfhisjy9w/image/upload/v1730447036/Screenshot_20241017_174331_Gallery_i6wbxm.jpg"
                  alt="NAPA President"
                  className="relative w-24 sm:w-36 h-24 sm:h-36 rounded-full object-cover border-4 border-white shadow-xl"
                />
              </div>
              <div className="text-center sm:text-left mt-4 sm:mt-0">
                <h3 className="font-semibold text-lg sm:text-xl text-gray-800">Srinivas Sayini</h3>
                <p className="text-indigo-600 font-medium text-sm sm:text-base">President, NAPA</p>
              </div>
            </div>

            <div className="relative mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed pl-2">
                <span className="text-gray-900 text-700 font-semibold">Dear NAPA Family,</span>
                <br />
                <br />
                I am deeply honored to serve as the President of NAPA, and I sincerely thank
                the NAPA Advisory Council, the Executive team, and the entire NAPA family
                for their unanimous support.
              </p>
            </div>

            <div className="text-left">
              <a href='/president-message'>
              <button className="inline-flex items-center bg-[#43529C] text-white px-3 sm:px-4 py-2 text-sm font-medium hover:bg-[#32408f] transition-colors">
                Read More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ourcompany;
