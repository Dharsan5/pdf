import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Brain, BookOpen, FileText, Layers, MessageSquare, GraduationCap } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const GenerationOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Set default selections: Key Topics, Quiz, and Summary
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "key-topics", 
    "quiz", 
    "summary"
  ]);
  
  // Mock document analysis results - in real app, this would come from the upload
  const [documentStats, setDocumentStats] = useState({
    keyTopics: 15,
    quizQuestions: 30,
    pages: 24,
    words: 5847,
    concepts: 8
  });

  const generationOptions = [
    {
      id: "key-topics",
      title: "Key Topics",
      icon: BookOpen,
      description: "Extract and organize main topics from your document",
      stats: `${documentStats.keyTopics} key topics extracted`,
      isRecommended: true
    },
    {
      id: "quiz",
      title: "Quiz",
      icon: Brain,
      description: "Generate comprehensive quiz questions to test knowledge",
      stats: `${documentStats.quizQuestions} quiz questions generated`,
      isRecommended: true
    },
    {
      id: "summary",
      title: "Summary",
      icon: FileText,
      description: "Create concise summary of the entire document",
      stats: "Summary ready",
      isRecommended: true
    },
    {
      id: "flashcards",
      title: "Flashcards",
      icon: Layers,
      description: "Interactive flashcards for quick review and memorization",
      stats: `${Math.floor(documentStats.keyTopics * 2.5)} flashcards available`
    },
    {
      id: "mind-map",
      title: "Mind Map",
      icon: Sparkles,
      description: "Visual mind maps to understand topic connections",
      stats: `${documentStats.concepts} concept clusters identified`
    },
    {
      id: "ai-tutor",
      title: "AI Tutor",
      icon: MessageSquare,
      description: "Interactive AI assistant for Q&A about the content",
      stats: "Chat tutor ready"
    },
    {
      id: "practice-exam",
      title: "Practice Exam",
      icon: GraduationCap,
      description: "Comprehensive exam simulation based on content",
      stats: `${Math.floor(documentStats.quizQuestions * 0.6)} exam questions prepared`
    }
  ];

  useEffect(() => {
    // Simulate document analysis based on uploaded file
    // In real app, this would be API call with document content
    const uploadedFile = location.state?.uploadedFile;
    if (uploadedFile) {
      // Simulate different stats based on file size/type
      const fileSize = uploadedFile.size || 1000000; // Default 1MB
      const estimatedPages = Math.max(1, Math.floor(fileSize / 50000)); // ~50KB per page
      const estimatedWords = estimatedPages * 250; // ~250 words per page
      const estimatedTopics = Math.max(5, Math.min(25, Math.floor(estimatedPages * 0.8)));
      const estimatedQuizzes = Math.max(10, Math.min(50, Math.floor(estimatedWords / 200)));
      
      setDocumentStats({
        keyTopics: estimatedTopics,
        quizQuestions: estimatedQuizzes,
        pages: estimatedPages,
        words: estimatedWords,
        concepts: Math.max(3, Math.floor(estimatedTopics / 2))
      });
    }
  }, [location.state]);

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      // Navigate to results page with selected options and document stats
      navigate('/results', { 
        state: { 
          selectedOptions,
          documentStats
        } 
      });
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
          {/* Document Analysis Summary */}
          <div className="mb-8">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">Document Analysis Complete</h3>
                  <p className="text-sm text-blue-700">Your document has been processed and analyzed</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{documentStats.pages}</div>
                  <div className="text-sm text-blue-600">Pages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{documentStats.words.toLocaleString()}</div>
                  <div className="text-sm text-blue-600">Words</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{documentStats.keyTopics}</div>
                  <div className="text-sm text-blue-600">Key Topics</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">{documentStats.concepts}</div>
                  <div className="text-sm text-blue-600">Concepts</div>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Generation Options Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold">AI Generation Options</h2>
            </div>

            {/* Options Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generationOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedOptions.includes(option.id);
                
                return (
                  <Card
                    key={option.id}
                    className={`p-6 cursor-pointer transition-all hover:shadow-md relative ${
                      isSelected 
                        ? "border-orange-500 bg-orange-500/5 shadow-sm" 
                        : "border-border hover:border-orange-500/50"
                    }`}
                    onClick={() => toggleOption(option.id)}
                  >
                    {/* Recommended Badge */}
                    {option.isRecommended && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Recommended
                      </div>
                    )}
                    
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
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-semibold">
                            {option.title}
                          </h3>
                          {isSelected && (
                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {option.description}
                        </p>
                        {/* Stats */}
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs font-medium text-green-600">
                            {option.stats}
                          </span>
                        </div>
                      </div>
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
