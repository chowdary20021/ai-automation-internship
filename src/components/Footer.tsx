
import React from 'react';
import { Github, Linkedin, ExternalLink, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-slate-50 border-t border-gray-100 py-12 px-4 mt-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-gray-700">
          <span className="text-lg">Built with</span>
          <Heart className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="text-lg">by</span>
          <span className="font-bold text-gray-900">Bollineni Narendra Chowdary</span>
        </div>
        
        <p className="text-gray-600">
          Email: 
          <a 
            href="mailto:narendrabollineni@gmail.com" 
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200 ml-2 font-medium hover:underline"
          >
            narendrabollineni@gmail.com
          </a>
        </p>
        
        <div className="flex justify-center space-x-6 pt-4">
          <a 
            href="#" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105 group"
          >
            <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            <span className="font-medium">GitHub</span>
            <ExternalLink className="w-4 h-4 opacity-50" />
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105 group"
          >
            <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            <span className="font-medium">LinkedIn</span>
            <ExternalLink className="w-4 h-4 opacity-50" />
          </a>
        </div>
      </div>
    </footer>
  );
};
