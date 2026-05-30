import React from 'react';

// Defining TypeScript interface for the Tech Stack items
interface TechItem {
  id: number;
  title: string;
  desc: string;
}

const Features = () => {
  // Data array containing your specialized full-stack architecture details
  const techStack: TechItem[] = [
    {
      id: 1,
      title: "Next.js Frontend",
      desc: "Fast compilation and React components optimized with streamlined data input form designs to securely transmit records to the database backend."
    },
    {
      id: 2,
      title: "Express & Mongoose",
      desc: "Robust backend server system handling local runtime execution frameworks, hosting API endpoints, and managing secure communications with MongoDB."
    },
    {
      id: 3,
      title: "MongoDB Compass",
      desc: "Advanced graphical user interface serving as the visual data management center to monitor database collections and validate schema logic configurations."
    }
  ];

  return (
    <div id="features" className="w-full py-8">
      {/* Responsive grid configuration:
        - 1 column on mobile layout (grid-cols-1)
        - 3 columns on desktop monitor viewports (md:grid-cols-3)
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch justify-center">
        {techStack.map((tech) => (
          <div 
            key={tech.id} 
            className="bg-[#161b22] border border-gray-800 p-6 rounded-xl hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col group"
          >
            {/* Round Badge Number Indicator */}
            <span className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-400 flex items-center justify-center text-sm font-semibold mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              {tech.id}
            </span>
            
            {/* Feature Card Main Title */}
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
              {tech.title}
            </h3>
            
            {/* Feature Card Descriptive Text Block */}
            <p className="text-gray-400 text-sm leading-relaxed grow">
              {tech.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;