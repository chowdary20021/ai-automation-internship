import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Cloud, Sun, CloudRain, Mail, User, MapPin, ExternalLink, Github, Linkedin } from "lucide-react";
const Index = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    city: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    toast
  } = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.city) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to get your weather report.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
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
      // Simulate API call - replace with actual webhook URL
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      toast({
        title: "Weather report requested!",
        description: "Your personalized weather summary will be sent to your email shortly."
      });

      // Reset form
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
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <header className="text-center pt-12 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6 space-x-3">
            <div className="relative">
              <Sun className="w-8 h-8 text-yellow-500 animate-pulse" />
              <Cloud className="w-6 h-6 text-blue-400 absolute -right-2 -top-1" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
              AI Weather Reporter
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Built by a passionate intern-in-the-making to automate weather insights!
          </p>
        </div>
      </header>

      {/* Main Form Section */}
      <main className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Get Your City's Weather Report
                </h2>
                <p className="text-gray-600">
                  Enter your details below to receive a personalized weather summary
                </p>
              </div>

              {submitted ? <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CloudRain className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Thanks! Your weather summary will be sent to your email shortly.
                  </h3>
                  <p className="text-gray-600">
                    Check your inbox in a few minutes for your personalized weather report.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">
                    Submit Another Request
                  </Button>
                </div> : <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" className="h-12 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your.email@example.com" className="h-12 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      City
                    </Label>
                    <Input id="city" name="city" type="text" value={formData.city} onChange={handleInputChange} placeholder="Enter your city name" className="h-12 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400" required />
                  </div>

                  <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg" disabled={isLoading}>
                    {isLoading ? <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </div> : "Get Weather Update"}
                  </Button>
                </form>}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* About This Project Section */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                About This Project
              </h3>
              <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                This is a qualifying task for the 🌤 AI Automation Internship. The system fetches real-time weather 
                and air quality based on your city and sends a personalized summary to your email. It's fully 
                automated using n8n, Supabase, and WeatherAPI.com.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">n8n Automation</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">Supabase</span>
                <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">WeatherAPI.com</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Real-time Data</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            Built with ❤️ by <span className="font-semibold text-gray-800">[Bollineni Narendra Chowdary]</span>
          </p>
          <p className="text-gray-500 mb-4">
            Email: <a href="mailto:your.email@example.com" className="text-blue-600 hover:text-blue-700 transition-colors">narendrabollineni@gmail.com</a>
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Github className="w-4 h-4" />
              GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Linkedin className="w-4 h-4" />
              LinkedIn
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;