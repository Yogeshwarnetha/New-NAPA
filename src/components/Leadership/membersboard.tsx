import { Users } from "lucide-react";

interface BoardMember {
  name: string;
  title?: string;
  image: string;
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

function MemberCard({ member }: { member: BoardMember }) {
  return (
    <div className="group relative flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative h-48 sm:h-56">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
        {member.title && (
          <p className="text-purple-600 font-medium text-sm">{member.title}</p>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="relative mb-12">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-2 border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-4 shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
      </div>
      <h2 className="text-center mt-6 text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
        {title}
      </h2>
    </div>
  );
}

function MembersBoardMain() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-24">
          <section>
            <SectionTitle title="Advisory Council" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {advisoryCouncil.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle title="Executive Committee" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {executiveCommittee.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MembersBoardMain;
