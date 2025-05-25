
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";

interface SuccessMessageProps {
  onReset: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onReset }) => {
  return (
    <div className="text-center py-16 space-y-6 animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center animate-scale-in">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">
          Request Submitted Successfully!
        </h3>
        <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
          Your personalized weather summary will be delivered to your email shortly. 
          Check your inbox in the next few minutes.
        </p>
      </div>

      <div className="pt-4">
        <Button 
          onClick={onReset} 
          variant="outline" 
          className="inline-flex items-center gap-2 h-12 px-6 font-medium hover:bg-gray-50 transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          Submit Another Request
        </Button>
      </div>
    </div>
  );
};
