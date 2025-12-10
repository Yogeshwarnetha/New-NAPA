import { useState } from 'react';
import DonationsMainImage from '../../Images/donations.jpg';

const Donations = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'updates' | 'comments'>('faq');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);


  const faqData = [
    {
      question: "What is Chari?",
      answer: "During the 19th century a profusion of charitable organizations emerged to alleviate the awful conditions of the working class in the slums."
    },
    {
      question: "Where does my money actually go?",
      answer: "The Enlightenment era charitable and philanthropic activity among voluntary associations and rich benefactors became a widespread cultural practice."
    },
    {
      question: "How do you choose locations to build a community center?",
      answer: "The emerging upper-class fashion for benevolence resulted in the incorporation of the first charitable organizations."
    },
    {
      question: "What percentage of my donation goes towards programs?",
      answer: "The Enlightenment era saw growing philosophical debate between those who championed state intervention and those who believed that private markets would provide welfare."
    },
    {
      question: "What's your goal?",
      answer: "Charities also began to adopt campaigning roles, where they would champion a cause and lobby the government for legislative change."
    }
  ];

  const updateDates = [
    "AUGUST 15, 2020",
    "JULY 23, 2020",
    "JULY 09, 2020",
    "APRIL 30, 2020"
  ];

  const renderFAQ = () => (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-8">FAQ</h2>
      <div className="space-y-8">
        {faqData.map((faq, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUpdates = () => (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-8">Updates</h2>
      <p className="text-gray-600 mb-8">
        Financial reports (e.g. tax returns, annual form fundraising, revenue from sale of goods and services or revenue from investment) are indicators to assess the financial sustainability of a charity, especially in charity evaluators.
      </p>
      <div className="space-y-4">
        {updateDates.map((date, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-lg shadow-sm mb-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="text-sm text-gray-500">{date}</div>
          </div>
        ))}
      </div>
    </div>
  );

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
          placeholder="Website"
          className="w-full p-2 border rounded-md"
          rows={4}
        />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="save-info" />
          <label htmlFor="save-info" className="text-sm text-gray-600">
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>
        <button
          type="submit"
          className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition-colors"
        >
          POST COMMENT
        </button>
      </form>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'faq':
        return renderFAQ();
      case 'updates':
        return renderUpdates();
      case 'comments':
        return renderCommentForm();
      default:
        return renderFAQ();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Main Content */}
      <div className="space-y-6">
        {/* Header Image and Donation Info */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative">
            <img 
              src={DonationsMainImage} 
              alt="Happy children" 
              className="w-full h-72 object-cover"
            />
          </div>

          {/* Donation Stats */}
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-2">Donate</h1>
            <p className="text-gray-600 mb-6">Help fund educational programs and provide essential aid to children across countries</p>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>46% Donated</span>
                <span>Goal: $50,000.00</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full w-[46%] bg-blue-600 rounded-full"></div>
              </div>
            </div>

            {/* Donation Numbers */}
            <div className="flex gap-8 mb-6">
              <div>
                <div className="text-2xl font-bold">43</div>
                <div className="text-sm text-gray-600">Donors</div>
              </div>
              <div>
                <div className="text-2xl font-bold">$12,040.00</div>
                <div className="text-sm text-gray-600">Donated</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mb-6">
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
            </div>

            <div className="bg-white py-8">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-jost leading-2">Donate Today</h2>
        <p className="text-gray-600 mb-8 donation-description">
        Support NAPA’s mission to uplift our community! Your donation funds cultural programs, scholarships, and welfare initiatives. Every gift makes a difference—join us in empowering our future!        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {['$10', '$25', '$50', '$100'].map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(Number(amount.slice(1)))}
              className={`px-6 py-2 rounded border ${
                selectedAmount === Number(amount.slice(1))
                  ? 'bg-blue-600 text-white border-[#4052A8]'
                  : 'border-gray-300 text-gray-700 hover:border-[#4052A8]'
              }`}
            >
              {amount}
            </button>
          ))}
          <input
            type="text"
            placeholder="Other Amount (USD)"
            className="px-4 py-2 border border-gray-300 focus:border-[#4052A8] outline-none"
          />
        </div>

        <button className="bg-blue-600 text-white px-8 py-2 font-medium hover:bg-[#364291] transition-colors w-full sm:w-auto">
          DONATE NOW
        </button>
      </div>
    </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="text-center">
          <div className="flex justify-center space-x-8 mb-6">
            <button 
              className={`py-2 px-4 rounded-md font-semibold transition-colors ${activeTab === 'faq' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('faq')}
            >
              FAQ
            </button>
            <button 
              className={`py-2 px-4 rounded-md font-semibold transition-colors ${activeTab === 'updates' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('updates')}
            >
              Updates
            </button>
            <button 
              className={`py-2 px-4 rounded-md font-semibold transition-colors ${activeTab === 'comments' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Donations;
