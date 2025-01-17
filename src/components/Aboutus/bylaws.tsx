import { useState } from 'react';
import { Scroll, Book, Users, Gavel, Calendar, DollarSign, FileText, ChevronDown, ChevronUp } from 'lucide-react';

function ByLaws() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const bylawSections = [
    {
      icon: Users,
      title: "Article I - Membership",
      content: [
        "Section 1.1: Eligibility",
        "Membership is open to all individuals of Padmashali descent and their families residing in North America.",
        "Section 1.2: Categories",
        "• Regular Member: Any person of Padmashali descent",
        "• Family Member: Includes spouse and children",
        "• Honorary Member: Distinguished individuals who have contributed to the community"
      ]
    },
    {
      icon: Gavel,
      title: "Article II - Governance",
      content: [
        "Section 2.1: Board of Directors",
        "The Board shall consist of elected officers including President, Vice President, Secretary, and Treasurer.",
        "Section 2.2: Terms of Office",
        "• Board members shall serve two-year terms",
        "• No member shall serve more than two consecutive terms in the same position"
      ]
    },
    {
      icon: Calendar,
      title: "Article III - Meetings",
      content: [
        "Section 3.1: Regular Meetings",
        "• General body meetings shall be held quarterly",
        "• Board meetings shall be held monthly",
        "Section 3.2: Special Meetings",
        "May be called by the President or by petition of 25% of members"
      ]
    },
    {
      icon: DollarSign,
      title: "Article IV - Finance",
      content: [
        "Section 4.1: Fiscal Year",
        "The fiscal year shall be January 1 to December 31",
        "Section 4.2: Dues",
        "• Annual membership dues shall be determined by the Board",
        "• Life membership options available"
      ]
    },
    {
      icon: FileText,
      title: "Article V - Amendments",
      content: [
        "Section 5.1: Procedure",
        "These bylaws may be amended by a two-thirds vote of the membership present at any regular meeting",
        "Section 5.2: Notice",
        "Proposed amendments must be submitted in writing 30 days prior to voting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/90" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <div className="flex items-center gap-4 mb-4">
              <Book className="w-10 h-10" />
              <h1 className="text-5xl font-bold">By-Laws</h1>
            </div>
            <p className="text-xl opacity-90">Governing Principles of NAPA</p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Scroll className="w-12 h-12 mx-auto mb-6 text-gray-700" />
            <p className="text-lg text-gray-600 leading-relaxed">
              These bylaws serve as the fundamental governing document of the North American Padmashali Association (NAPA), 
              establishing the structure, rules, and procedures that guide our organization's operations and decision-making processes.
            </p>
          </div>
        </div>
      </section>

      {/* Bylaws Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {bylawSections.map((section, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <section.icon className="w-6 h-6 text-gray-700" />
                    <h2 className="text-xl font-semibold text-left">{section.title}</h2>
                  </div>
                  {openSection === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openSection === index && (
                  <div className="mt-2 p-6 bg-white rounded-lg shadow-md">
                    {section.content.map((text, i) => (
                      <p key={i} className={`${text.startsWith('Section') ? 'font-semibold mt-4 mb-2' : 'ml-4 mb-2 text-gray-600'}`}>
                        {text}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-4">
              Last Updated: January 2024
            </p>
            <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Download PDF Version
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default ByLaws;