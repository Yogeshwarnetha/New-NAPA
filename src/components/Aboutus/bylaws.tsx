import { useState } from 'react';
import { Book, ChevronDown, ScrollText } from 'lucide-react';

const ByLaws = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const bylawsSections = [
    {
      id: 'article1',
      title: 'Article I - Name and Purpose',
      content: [
        'Section 1.1: The name of this organization shall be the Nepalese Association of Professionals in America (NAPA).',
        'Section 1.2: NAPA is established as a non-profit organization dedicated to uniting Nepalese professionals in America.',
        'Section 1.3: Our purpose is to promote professional development, cultural preservation, and community service.'
      ]
    },
    {
      id: 'article2',
      title: 'Article II - Membership',
      content: [
        'Section 2.1: Membership is open to all Nepalese professionals and students residing in America.',
        'Section 2.2: Members must maintain good standing by paying annual dues and adhering to the organization\'s code of conduct.',
        'Section 2.3: Members have voting rights and can participate in all NAPA activities.'
      ]
    },
    {
      id: 'article3',
      title: 'Article III - Governance',
      content: [
        'Section 3.1: NAPA shall be governed by an elected Executive Committee.',
        'Section 3.2: The Executive Committee shall consist of President, Vice President, Secretary, Treasurer, and Board Members.',
        'Section 3.3: Elections shall be held every two years through a democratic process.'
      ]
    },
    {
      id: 'article4',
      title: 'Article IV - Meetings',
      content: [
        'Section 4.1: General meetings shall be held quarterly.',
        'Section 4.2: The Annual General Meeting (AGM) shall be held once a year.',
        'Section 4.3: Special meetings may be called by the Executive Committee as needed.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white mt-24">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Book className="h-16 w-16 mx-auto text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">
              NAPA By-Laws
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Governing principles and regulations that guide our organization's operations
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <ScrollText className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">About Our By-Laws</h2>
          </div>
          <p className="text-gray-600">
            These by-laws serve as the fundamental governing document of NAPA, establishing our organizational structure,
            operational procedures, and governance framework. They reflect our commitment to transparency, democracy,
            and effective community service.
          </p>
        </div>
      </div>

      {/* By-Laws Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-4">
          {bylawsSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-150"
              >
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
                    activeSection === section.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeSection === section.id && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="space-y-4">
                    {section.content.map((text, index) => (
                      <p key={index} className="text-gray-600">
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Last updated: March 2024 • For any questions regarding the by-laws, please contact the NAPA Secretary
          </p>
        </div>
      </div>
    </div>
  );
};

export default ByLaws;