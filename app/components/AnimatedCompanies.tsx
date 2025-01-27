interface Company {
  name: string;
  logo: string;
}

const companies: Company[] = [
  {
    name: 'Microsoft',
    logo: '/companies/microsoft.svg',
  },
  {
    name: 'Google',
    logo: '/companies/google.svg',
  },
  {
    name: 'Amazon',
    logo: '/companies/amazon.svg',
  },
  {
    name: 'Meta',
    logo: '/companies/meta.svg',
  },
  {
    name: 'Apple',
    logo: '/companies/apple.svg',
  },
  {
    name: 'Netflix',
    logo: '/companies/netflix.svg',
  },
];

const AnimatedCompanies: React.FC = () => {
  return (
    <div className="container relative w-full overflow-hidden mt-16">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
      <div className="flex animate-scroll">
        {/* First set of company logos */}
        <div className="flex shrink-0">
          {companies.map((company, index) => (
            <img
              key={`${company.name}-${index}`}
              src={company.logo}
              alt={company.name}
              className="h-8 object-contain mx-4"
            />
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex shrink-0">
          {companies.map((company, index) => (
            <img
              key={`${company.name}-${index}-duplicate`}
              src={company.logo}
              alt={company.name}
              className="h-8 object-contain mx-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedCompanies;
