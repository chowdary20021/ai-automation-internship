
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const ProjectInfo: React.FC = () => {
  const technologies = [
    { name: "n8n Automation", color: "bg-blue-100 text-blue-800" },
    { name: "Supabase", color: "bg-emerald-100 text-emerald-800" },
    { name: "WeatherAPI.com", color: "bg-sky-100 text-sky-800" },
    { name: "Real-time Data", color: "bg-purple-100 text-purple-800" }
  ];

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-8 space-y-6">
        <div className="text-center space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            About This Project
          </h3>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            This is a qualifying task for the 🌤 <strong>AI Automation Internship</strong>. 
            The system fetches real-time weather and air quality data based on your city 
            and sends a personalized summary to your email. It's fully automated using 
            modern tools and APIs.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <span 
              key={tech.name}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 ${tech.color}`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
