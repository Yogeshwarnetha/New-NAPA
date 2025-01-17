import  { useState } from 'react';
import { ClipboardList, Users, Calendar, DollarSign, Globe, Mail, FileCheck, Building2, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

function OperationalGuidelines() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const guidelines = [
    {
      icon: Users,
      title: "Membership Management",
      content: [
        "1. Member Registration",
        "• Online registration through NAPA website",
        "• Verification of Padmashali community affiliation",
        "• Membership card issuance within 14 days",
        "2. Member Communication",
        "• Monthly newsletter distribution",
        "• Regular updates via email and mobile app",
        "• Annual membership directory publication"
      ]
    },
    {
      icon: Calendar,
      title: "Event Planning & Execution",
      content: [
        "1. Annual Events",
        "• Minimum 4 cultural events per year",
        "• One annual general body meeting",
        "• Quarterly regional meetups",
        "2. Event Protocol",
        "• 60-day advance notice for major events",
        "• Online registration system",
        "• Post-event feedback collection"
      ]
    },
    {
      icon: DollarSign,
      title: "Financial Operations",
      content: [
        "1. Budget Management",
        "• Annual budget preparation by December",
        "• Quarterly financial reviews",
        "• Expense approval process",
        "2. Fund Allocation",
        "• 30% for community development",
        "• 40% for educational initiatives",
        "• 20% for cultural programs",
        "• 10% for administrative expenses"
      ]
    },
    {
      icon: Globe,
      title: "Community Services",
      content: [
        "1. Educational Support",
        "• Scholarship application process",
        "• Mentorship program guidelines",
        "• Career guidance sessions",
        "2. Social Services",
        "• Emergency assistance protocol",
        "• Marriage assistance program",
        "• Immigration support services"
      ]
    },
    {
      icon: Building2,
      title: "Administrative Procedures",
      content: [
        "1. Documentation",
        "• Standardized forms and templates",
        "• Record keeping requirements",
        "• Annual report preparation",
        "2. Committee Operations",
        "• Formation guidelines",
        "• Regular meeting schedule",
        "• Progress reporting format"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <div className="flex items-center gap-4 mb-4">
              <ClipboardList className="w-10 h-10" />
              <h1 className="text-5xl font-bold">Operational Guidelines</h1>
            </div>
            <p className="text-xl opacity-90">Standard Operating Procedures for NAPA</p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Briefcase className="w-12 h-12 mx-auto mb-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-center mb-4">Purpose & Scope</h2>
              <p className="text-gray-600 text-center leading-relaxed">
                These operational guidelines establish standardized procedures for NAPA's day-to-day operations, 
                ensuring consistency, efficiency, and transparency across all organizational activities. They serve 
                as a comprehensive reference for board members, volunteers, and staff to maintain high standards of 
                service to our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {guidelines.map((section, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <section.icon className="w-6 h-6 text-blue-600" />
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
                      <p key={i} className={`${text.startsWith('1.') || text.startsWith('2.') ? 'font-semibold mt-4 mb-2' : 'ml-4 mb-2 text-gray-600'}`}>
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

      {/* Contact Section */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Need Clarification?</h2>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">operations@napa.org</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                <button className="text-blue-600 hover:underline">
                  Download Guidelines PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default OperationalGuidelines;