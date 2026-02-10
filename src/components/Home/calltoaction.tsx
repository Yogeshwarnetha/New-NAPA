import LogoMain from '../../Images/logo-main.png'

const CallToAction = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 max-w-xl">
          <h4 className="text-sm uppercase tracking-wider text-indigo-600 font-semibold mb-2">
            HELP US STOP THE PROBLEM
          </h4>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#3f51b5] mb-6 call-to-action-heading">
            We Need Your Help
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed call-to-action-description">
            Charities also began to adopt campaigning roles, where they would champion a cause and lobby the government for legislative change. This included organized campaigns against the ill treatment of animals and children and the campaign that eventually succeeded at the turn.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#43529C] text-white px-8 py-3 font-medium hover:bg-[#32408f] transition-colors">
              DONATE NOW
            </button>
            <button className="border-2 border-[#3f51b5] text-[#3f51b5] px-8 py-3 font-medium hover:bg-[#3f51b5] hover:text-white transition-colors">
              VOLUNTEER
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img 
            src={LogoMain}
            alt="Charity Logo"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;