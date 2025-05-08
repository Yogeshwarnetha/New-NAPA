import { Users } from "lucide-react";
import { motion } from "framer-motion";

interface BoardMember {
  name: string;
  title?: string;
  image: string;
}

interface SectionTitleProps {
  title: string;
  className?: string;
}

const advisoryCouncil: BoardMember[] = [
  {
    name: "Dr. Hari Eppanapally",
    image: "https://napausa.org/img/committees/Hari.jpeg",
  },
  {
    name: "Pradeep Samala",
    image: "https://napausa.org/img/committees/Pradeep.jpeg",
  },
  {
    name: "Baburao Samala",
    image: "https://res-console.cloudinary.com/dfhisjy9w/thumbnails/v1/image/upload/v1730447037/U2NyZWVuc2hvdF8yMDI0MTAxN18xMTE4NDhfR2FsbGVyeV9taWdkYnY=/drilldown",
  },
];

const executiveCommittee: BoardMember[] = [
  {
    name: "Srinivas Sayini",
    title: "President",
    image: "https://napausa.org/img/committees/ss.jpg",
  },
  {
    name: "Prabhakar Konda",
    title: "President Elect",
    image: "https://napausa.org/img/committees/pk.jpg",
  },
  {
    name: "Sri Cherupally",
    title: "General Secretary",
    image: "https://napausa.org/img/committees/sri.jpg",
  },
  {
    name: "Santhosh Ankam",
    title: "Joint Secretary",
    image: "https://napausa.org/img/committees/sa.jpg",
  },
];

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
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-24"
        >
          <section>
            <SectionTitle
              title="Advisory Council"
              className="text-3xl md:text-4xl"
            />
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {advisoryCouncil.map((member, index) => (
                <MemberCard key={`${member.name}-${index}`} member={member} />
              ))}
            </motion.div>
          </section>

          <section>
            <SectionTitle title="Executive Committee" className="text-3xl md:text-4xl" />
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {executiveCommittee.map((member, index) => (
                <MemberCard key={`${member.name}-${index}`} member={member} />
              ))}
            </motion.div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default MembersBoardMain;