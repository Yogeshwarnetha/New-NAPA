
const Stats = () => {
  const stats = [
    { number: '1M', label: 'Monthly', sublabel: 'Visitors' },
    { number: '20M', label: 'Volunteers', sublabel: 'Connected' },
    { number: '80', label: 'Countries', sublabel: 'Worldwide' },
    { number: '2M', label: 'Volunteers', sublabel: 'Needed' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2 stat-text-font">{stat.number}</h3>
          <p className="text-sm text-gray-600 stat-text-font">{stat.label}</p>
          <p className="text-sm text-gray-600 stat-text-font">{stat.sublabel}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;