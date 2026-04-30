
export function DonationSection() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 py-12 md:py-16 rounded-2xl mx-4 my-8 shadow-sm">
      <div className="max-w-3xl mx-auto text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 font-jost">Donate Today</h2>
        <p className="text-gray-700 mb-8 md:text-lg leading-relaxed donation-description">
          Support NAPA’s mission to uplift our community! Your donation funds cultural programs, scholarships, and welfare initiatives. Every gift makes a difference—join us in empowering our future!
        </p>
        <a href="https://donations.napausa.org/" target="_blank" rel="noopener noreferrer">
          <button className="bg-[#43529C] text-white px-10 py-3 rounded-lg font-semibold hover:bg-[#364291] hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto">
            DONATE NOW
          </button>
        </a>
      </div>
    </div>
  );
}