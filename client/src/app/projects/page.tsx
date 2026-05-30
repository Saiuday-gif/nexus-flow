"use client"; // It is important to include this at the top of the file to enable client-side rendering for this page.

import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  fullDetails: string; // New field to hold the detailed information about the project
}

const ProjectsPage = () => {
  // State to manage the currently selected project for displaying details
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsList: Project[] = [
    {
      id: 1,
      title: "Workflow Manager",
      description: "Manage workflows and team tasks efficiently.",
      status: "Active",
      fullDetails: "Detailed view of Workflow Manager: This project involves managing back-end cron jobs, task distribution structures, and optimizing pipeline queues for team collaboration."
    },
    {
      id: 2,
      title: "Secure Endpoints Connect",
      description: "Connect external services with secure and encrypted endpoints.",
      status: "In Progress",
      fullDetails: "Detailed view of Secure Endpoints Connect: Implementing OAuth2 authentication, TLS 1.3 encryption, and robust middleware layer handlers to manage external webhook connections safely."
    },
    {
      id: 3,
      title: "Reusable UI Components",
      description: "Build reusable UI components and design patterns for the ecosystem.",
      status: "Completed",
      fullDetails: "Detailed view of Reusable UI Components: Creating a collection of highly reusable Tailwind CSS core atomic components including tables, custom buttons, modals, and dynamic sidebars."
    }
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 relative">
      {/* Page Heading Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">Projects</h1>
        <p className="text-slate-400 text-sm md:text-base">
          Explore your active projects and overview details.
        </p>
      </div>

      {/* Project Cards Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsList.map((project) => (
          <div 
            key={project.id} 
            className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                project.status === 'Active' ? 'bg-green-100 text-green-800' :
                project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                'bg-slate-100 text-slate-800'
              }`}>
                {project.status}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {project.title}
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            {/* View Details Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedProject(project)}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🌟 New Details Modal 🌟 */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-slate-900">{selectedProject.title}</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
                {selectedProject.status}
              </span>
            </div>
            
            <p className="text-slate-700 text-base leading-relaxed mb-6">
              {selectedProject.fullDetails}
            </p>
            
            <div className="flex justify-end">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;