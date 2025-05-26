
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, MapPin } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  city: string;
}

interface WeatherFormProps {
  onSubmissionSuccess: () => void;
}

export const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmissionSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    city: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.city) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to get your weather report.",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    console.log("Form submitted with data:", formData);

    try {
      // n8n webhook URL - update port if your n8n instance runs on a different port
      const webhookUrl = "https://asdfghjkqwertyui.app.n8n.cloud/webhook/weather-report";
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          city: formData.city
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      onSubmissionSuccess();
      toast({
        title: "Weather report requested!",
        description: "Your personalized weather summary will be sent to your email shortly."
      });

      setFormData({
        fullName: '',
        email: '',
        city: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Get Your City's Weather Report
        </h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
          Enter your details below to receive a personalized weather summary delivered to your inbox
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 group">
          <Label 
            htmlFor="fullName" 
            className="text-sm font-semibold text-gray-800 flex items-center gap-2 transition-colors group-focus-within:text-blue-600"
          >
            <User className="w-4 h-4" />
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="h-14 text-base border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500/20 focus:ring-4 transition-all duration-200 hover:border-gray-300"
            required
          />
        </div>

        <div className="space-y-2 group">
          <Label 
            htmlFor="email" 
            className="text-sm font-semibold text-gray-800 flex items-center gap-2 transition-colors group-focus-within:text-blue-600"
          >
            <Mail className="w-4 h-4" />
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
            className="h-14 text-base border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500/20 focus:ring-4 transition-all duration-200 hover:border-gray-300"
            required
          />
        </div>

        <div className="space-y-2 group">
          <Label 
            htmlFor="city" 
            className="text-sm font-semibold text-gray-800 flex items-center gap-2 transition-colors group-focus-within:text-blue-600"
          >
            <MapPin className="w-4 h-4" />
            City
          </Label>
          <Input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter your city name"
            className="h-14 text-base border-gray-200 bg-white/80 backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500/20 focus:ring-4 transition-all duration-200 hover:border-gray-300"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg disabled:transform-none disabled:hover:scale-100"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing your request...
            </div>
          ) : (
            "Get Weather Update"
          )}
        </Button>
      </form>
    </div>
  );
};
