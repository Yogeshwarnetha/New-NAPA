// import { useState } from 'react';

const Donations = () => {
  // FAQ and Updates removed
  const renderCommentForm = () => (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-8">LEAVE A REPLY</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name*"
            className="p-2 border rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email*"
            className="p-2 border rounded-md"
            required
          />
        </div>
        <textarea
          placeholder="Comment"
          className="w-full p-2 border rounded-md"
          rows={4}
        />
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 font-medium hover:bg-[#364291] transition-colors w-full sm:w-auto inline-block"
        >
          POST COMMENT
        </button>
      </form>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Main Content */}
      <div className="space-y-6">
        {/* Header Image and Donation Info */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative">
            {/* <img 
              src={DonationsMainImage} 
              alt="Happy children" 
              className="w-full h-72 object-cover"
            /> */}
          </div>
          {/* Donation Stats Removed: Progress, Goal, Donors, Donated */}
          <div className="p-6">
            {/* <h1 className="text-2xl font-semibold mb-2">Donate</h1> */}
            {/* <p className="text-gray-600 mb-6">Help fund educational programs and provide essential aid to children across countries</p> */}
            {/* Social Links */}
            {/* <div className="flex gap-4 mb-6">
              <button className="p-2 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-3.5 7.5h-3v3h3v3h-3v3h-3v-3h-3v-3h3v-3h-3v-3h3v-3h3v3h3v3z"/>
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-6 1c7 4 13 1 13-7a7.35 7.35 0 001.88-5C21.3 6.26 22.5 4 23 3z"/>
                </svg>
              </button>
            </div> */}

            <div className="bg-white py-8">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-jost leading-2">Donate Today</h2>
        <p className="text-gray-600 mb-8 donation-description">
        Support NAPA’s mission to uplift our community! Your donation funds cultural programs, scholarships, and welfare initiatives. Every gift makes a difference—join us in empowering our future!
        </p>
        <a
          href="https://checkout.square.site/merchant/XQQYWZ0XCSB8B/checkout/DT7LDQF2CO5RPLHPRXHDHYIH"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-8 py-2 font-medium hover:bg-[#364291] transition-colors w-full sm:w-auto inline-block"
        >
          DONATE NOW
        </a>
      </div>
    </div>
          </div>
        </div>
        {/* Only Comment Form remains */}
        {renderCommentForm()}
      </div>
    </div>
  );
};

export default Donations;
