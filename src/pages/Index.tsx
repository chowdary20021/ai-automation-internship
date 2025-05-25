
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { WeatherForm } from "@/components/WeatherForm";
import { SuccessMessage } from "@/components/SuccessMessage";
import { ProjectInfo } from "@/components/ProjectInfo";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmissionSuccess = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30">
      <Header />

      {/* Main Form Section */}
      <main className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md hover:shadow-3xl transition-all duration-500">
            <CardContent className="p-10">
              {submitted ? (
                <SuccessMessage onReset={handleReset} />
              ) : (
                <WeatherForm onSubmissionSuccess={handleSubmissionSuccess} />
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Project Info Section */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <ProjectInfo />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
