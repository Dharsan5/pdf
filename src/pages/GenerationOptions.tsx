import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Brain, BookOpen, FileText, Layers } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const GenerationOptions = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const generationOptions = [
    {
      id: "practice-questions",
      title: "Practice Questions",
      icon: Brain,
      description: "Generate practice questions to test your knowledge"
    },
    {
      id: "smart-summary",
      title: "Smart Summary",
      icon: BookOpen,
      description: "Create concise summaries of key concepts"
    },
    {
      id: "mind-map",
      title: "Mind Map",
      icon: Layers,
      description: "Visual mind maps to understand connections"
    },
    {
      id: "flashcards",
      title: "Flashcards",
      icon: FileText,
      description: "Interactive flashcards for quick review"
    }
  ];

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      // Navigate to results page with selected options
      navigate('/results', { state: { selectedOptions } });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/upload"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Generation Options
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose what content you want to generate
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* AI Generation Options Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold">AI Generation Options</h2>
            </div>

            {/* Options Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {generationOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedOptions.includes(option.id);
                
                return (
                  <Card
                    key={option.id}
                    className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                      isSelected 
                        ? "border-orange-500 bg-orange-500/5 shadow-sm" 
                        : "border-border hover:border-orange-500/50"
                    }`}
                    onClick={() => toggleOption(option.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isSelected 
                            ? "bg-orange-500 text-white" 
                            : "bg-orange-500/10 text-orange-500"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">
                          {option.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Selection Summary */}
          {selectedOptions.length > 0 && (
            <div className="mb-8 p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg">
              <h3 className="font-semibold text-orange-600 mb-2">
                Selected Options ({selectedOptions.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedOptions.map(optionId => {
                  const option = generationOptions.find(opt => opt.id === optionId);
                  return (
                    <span 
                      key={optionId}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-sm"
                    >
                      {option?.title}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOption(optionId);
                        }}
                        className="ml-1 hover:bg-orange-500/20 rounded-full p-0.5"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              disabled={selectedOptions.length === 0}
              className="w-full max-w-sm h-14 text-lg font-semibold bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white border-0"
            >
              CONTINUE
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Select one or more options to generate AI-powered study materials
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              You can always generate more content later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationOptions;
