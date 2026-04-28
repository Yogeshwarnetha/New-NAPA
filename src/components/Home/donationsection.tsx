import { useState } from 'react';

export function DonationSection() {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-jost leading-2">Donate Today</h2>
        <p className="text-gray-600 mb-8 donation-description">
          Support NAPA’s mission to uplift our community! Your donation funds cultural programs, scholarships, and welfare initiatives. Every gift makes a difference—join us in empowering our future!
        </p>
        <a href="https://donations.napausa.org/" target="_blank" rel="noopener noreferrer">
          <button className="bg-[#43529C] text-white px-8 py-2 font-medium hover:bg-[#364291] transition-colors w-full sm:w-auto">
            DONATE NOW
          </button>
        </a>
      </div>
    </div>
  );
}