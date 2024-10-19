import AnimateOnAppear from './AnimateOnAppear';

interface SectionStarterProps {
  tag: string;
  title: string;
  description: string;
  id: string;
}

const SectionStarter = ({tag, title, description, id}: SectionStarterProps) => {
  return (
    <div className="container mt-12 md:mt-20" id={id}>
      <AnimateOnAppear>
        <div className="flex flex-col text-center justify-center items-center w-full">
          <div className="text-[12px] font-bold text-color-blue">{tag}</div>
          <div className="text-xl font-semibold text-color-text mt-2">
            {title}
          </div>
          <div className="text-xl font-semibold text-color-textLight mt-1 max-w-md">
            {description}
          </div>
        </div>
      </AnimateOnAppear>
    </div>
  );
};

export default SectionStarter;
