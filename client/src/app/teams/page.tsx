"use client";

import React, { useState } from 'react';

// Defining the Team interface to structure our team data
interface Team {
  id: number;
  name: string;
  description: string;
  membersCount: number;
  membersList: string[]; // Clicked team members details for modal display
}
const TeamsPage = () => {
  // State to manage the currently selected team for displaying member details in a modal
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Sample data for teams - in a real application, this would likely come from an API
  const teamsList: Team[] = [
    {
      id: 1,
      name: "Team Alpha",
      description: "Product design and engineering core development.",
      membersCount: 5,
      membersList: ["Sai Uday (Lead Eng.)", "Ananya (UI Designer)", "Rahul (Backend)", "Srinivas (DevOps)", "Pooja (QA)"]
    },
    {
      id: 2,
      name: "Team Growth",
      description: "Marketing, user acquisition, and customer success management.",
      membersCount: 3,
      membersList: ["Vikram (Growth Lead)", "Kavitha (Marketing)", "Arjun (Data Analyst)"]
    }
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 relative">
      {/* Page Heading Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">Teams</h1>
        <p className="text-slate-400 text-sm md:text-base">
          Manage your teams and collaborate with your organization.
        </p>
      </div>

      {/* Team Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {teamsList.map((team) => (
          <div 
            key={team.id} 
            className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-all duration-200"
          >
            {/* Team Name - Clear Dark Color */}
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {team.name}
            </h2>
            
            {/* Team Description */}
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {team.description}
            </p>

            {/* Member Count and Action Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                👥 {team.membersCount} Members
              </span>
              <button 
                onClick={() => setSelectedTeam(team)}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                View Members →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🌟 Team Members Details Modal 🌟 */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-2xl font-bold text-slate-900">{selectedTeam.name}</h3>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                Active Roster
              </span>
            </div>
            
            {/* Team Members List */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-500 mb-3">Team Members:</p>
              <ul className="space-y-2">
                {selectedTeam.membersList.map((member, index) => (
                  <li key={index} className="flex items-center text-slate-800 text-base bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-3"></span>
                    {member}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Close Button */}
            <div className="flex justify-end">
              <button 
                onClick={() => setSelectedTeam(null)}
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

export default TeamsPage;