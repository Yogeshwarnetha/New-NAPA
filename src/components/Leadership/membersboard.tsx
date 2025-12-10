import { useState, useEffect } from 'react';
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { fetchAdvisoryCouncilData } from "../../apirequest/boardMember";
import { fetchExecutiveCommitteeData } from "../../apirequest/boardMember";

interface BoardMember {
  id: number;
  name: string;
  title?: string;
  imageUrl: string;
}

interface SectionTitleProps {
  title: string;
  className?: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function MemberCard({ member }: { member: BoardMember }) {
  return (
    <motion.div
      variants={fadeIn}
      className="group relative flex flex-col h-full bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 flex flex-col items-center text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        {member.title && (
          <p className="text-purple-600 font-semibold text-sm bg-purple-50 px-3 py-1 rounded-full mt-2">
            {member.title}
          </p>
        )}
      </div>
    </motion.div>
  );
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative mb-16"
    >
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200/80"></div>
      </div>
      <div className="relative flex justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-4 shadow-lg ring-2 ring-white ring-opacity-20"
        >
          <Users className="w-8 h-8 text-white" />
        </motion.div>
      </div>
      <h2 className={`text-center mt-8 font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 
        text-4xl sm:text-5xl ${className}`}>
        {title}
      </h2>
    </motion.div>
  );
}

function MembersBoardMain() {
  const [advisoryCouncil, setAdvisoryCouncil] = useState<BoardMember[]>([]);
  const [executiveCommittee, setExecutiveCommittee] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState({
    advisory: true,
    executive: true
  });
  const [error, setError] = useState({
    advisory: '',
    executive: ''
  });

  useEffect(() => {
    const fetchAdvisoryData = async () => {
      try {
        const response = await fetchAdvisoryCouncilData();
        setAdvisoryCouncil(response.data || []); // Access .data here
      } catch (err) {
        setError(prev => ({ ...prev, advisory: 'Failed to load advisory council' }));
        console.error("Error fetching advisory council:", err);
      } finally {
        setLoading(prev => ({ ...prev, advisory: false }));
      }
    };

    const fetchExecutiveData = async () => {
      try {
        const response = await fetchExecutiveCommitteeData();
        setExecutiveCommittee(response.data || []); // Access .data here
      } catch (err) {
        setError(prev => ({ ...prev, executive: 'Failed to load executive committee' }));
        console.error("Error fetching executive committee:", err);
      } finally {
        setLoading(prev => ({ ...prev, executive: false }));
      }
    };

    fetchAdvisoryData();
    fetchExecutiveData();
  }, []);

  if (loading.advisory && loading.executive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-24"
        >
          {/* Advisory Council Section */}
          <section>
            <SectionTitle
              title="Advisory Council"
              className="text-3xl md:text-4xl"
            />
            {error.advisory ? (
              <div className="text-center py-8 text-red-500">
                {error.advisory}
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {advisoryCouncil.length > 0 ? (
                  advisoryCouncil.map((member) => (
                    <MemberCard key={`advisory-${member.id}`} member={member} />
                  ))
                ) : (
                  !loading.advisory && (
                    <div className="col-span-full text-center text-gray-500 py-8">
                      No advisory council members found
                    </div>
                  )
                )}
              </motion.div>
            )}
          </section>

          {/* Executive Committee Section */}
          <section>
            <SectionTitle
              title="Executive Committee"
              className="text-3xl md:text-4xl"
            />
            {error.executive ? (
              <div className="text-center py-8 text-red-500">
                {error.executive}
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {executiveCommittee.length > 0 ? (
                  executiveCommittee.map((member) => (
                    <MemberCard key={`executive-${member.id}`} member={member} />
                  ))
                ) : (
                  !loading.executive && (
                    <div className="col-span-full text-center text-gray-500 py-8">
                      No executive committee members found
                    </div>
                  )
                )}
              </motion.div>
            )}
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default MembersBoardMain;