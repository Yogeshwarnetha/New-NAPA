import { useState, useEffect } from 'react';
import {  Award, Briefcase, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

import { fetchAdvisoryCouncilData, fetchExecutiveCommitteeData, fetchBoardofDirectorsPagination } from "../../apirequest/boardMember";

interface BoardMember {
  id: number;
  name: string;
  title?: string;
  imageUrl: string;
}

interface SectionTitleProps {
  title: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
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
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group"
    >
      <motion.div
        variants={cardHover}
        className="relative flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200"
      >
        {/* Image Container - Optimized for portraits */}
        <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-0" />
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=gray&color=fff&size=400`;
            }}
          />
          
          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
            {member.name}
          </h3>
          
          {/* Title */}
          {member.title && (
            <p className="text-gray-700 text-sm leading-relaxed mt-auto">
              {member.title}
            </p>
          )}
        </div>

        {/* Bottom Border Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </motion.div>
    </motion.div>
  );
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center mb-6">
        
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
          
        </div>
      </div>
      <div className="w-16 h-1 bg-gray-900"></div>
    </motion.div>
  );
}

function MembersBoardMain() {
  const [advisoryCouncil, setAdvisoryCouncil] = useState<BoardMember[]>([]);
  const [executiveCommittee, setExecutiveCommittee] = useState<BoardMember[]>([]);
  const [boardDirectors, setBoardDirectors] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState({
    advisory: true,
    executive: true,
    directors: true
  });
  const [error, setError] = useState({
    advisory: '',
    executive: '',
    directors: ''
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [advisoryResponse, executiveResponse, directorsResponse] = await Promise.allSettled([
          fetchAdvisoryCouncilData(),
          fetchExecutiveCommitteeData(),
          fetchBoardofDirectorsPagination(1, 100)
        ]);

        if (advisoryResponse.status === 'fulfilled') {
          setAdvisoryCouncil(advisoryResponse.value.data || []);
        } else {
          setError(prev => ({ ...prev, advisory: 'Unable to load advisory council' }));
        }

        if (executiveResponse.status === 'fulfilled') {
          setExecutiveCommittee(executiveResponse.value.data || []);
        } else {
          setError(prev => ({ ...prev, executive: 'Unable to load executive committee' }));
        }

        if (directorsResponse.status === 'fulfilled') {
          setBoardDirectors(directorsResponse.value.data || []);
        } else {
          setError(prev => ({ ...prev, directors: 'Unable to load board of directors' }));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading({ advisory: false, executive: false, directors: false });
      }
    };

    fetchAllData();
  }, []);

  if (loading.advisory && loading.executive && loading.directors) {
    return (
      <div className="min-h-screen bg-white py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-12 h-12 border-2 border-gray-300 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-2 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading leadership team...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Leadership Team
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Guided by exceptional leaders who bring diverse expertise and shared commitment 
            to excellence and innovation.
          </p>
          <div className="mt-8 w-24 h-1 bg-gray-900 mx-auto"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-20"
        >
          {/* Advisory Council Section */}
          <section className="scroll-mt-20">
            <SectionTitle
              title="Advisory Council"
            />
            {error.advisory ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mb-4">
                  <Award className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-gray-700">{error.advisory}</p>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {advisoryCouncil.length > 0 ? (
                  advisoryCouncil.map((member) => (
                    <MemberCard key={`advisory-${member.id}`} member={member} />
                  ))
                ) : (
                  !loading.advisory && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No advisory council members available</p>
                    </div>
                  )
                )}
              </motion.div>
            )}
          </section>

          {/* Executive Committee Section */}
          <section className="scroll-mt-20">
            <SectionTitle
              title="Executive Committee"
            />
            {error.executive ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mb-4">
                  <Briefcase className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-gray-700">{error.executive}</p>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {executiveCommittee.length > 0 ? (
                  executiveCommittee.map((member) => (
                    <MemberCard key={`executive-${member.id}`} member={member} />
                  ))
                ) : (
                  !loading.executive && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No executive committee members available</p>
                    </div>
                  )
                )}
              </motion.div>
            )}
          </section>

          {/* Board of Directors Section */}
          <section className="scroll-mt-20">
            <SectionTitle
              title="Board of Directors"
            />
            {error.directors ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mb-4">
                  <Shield className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-gray-700">{error.directors}</p>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {boardDirectors.length > 0 ? (
                  boardDirectors.map((member) => (
                    <MemberCard key={`director-${member.id}`} member={member} />
                  ))
                ) : (
                  !loading.directors && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No board of directors available</p>
                    </div>
                  )
                )}
              </motion.div>
            )}
          </section>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-8 border-t border-gray-200"
        >
          <p className="text-center text-gray-500 text-sm">
            Our leadership team represents decades of combined experience and dedication to our mission.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default MembersBoardMain;