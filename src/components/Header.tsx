
import React from 'react';
import { Cloud, Sun } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="text-center pt-16 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-center mb-8 space-x-4 animate-fade-in">
          <div className="relative">
            <Sun className="w-12 h-12 text-amber-500 animate-pulse" />
            <Cloud className="w-8 h-8 text-blue-400 absolute -right-3 -top-2" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight">
            AI Weather Reporter
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Built by a passionate intern-in-the-making to automate weather insights
        </p>
        
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
      </div>
    </header>
  );
};
