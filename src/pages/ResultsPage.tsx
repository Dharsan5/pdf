import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Share2, BookOpen, Brain, Layers, FileText, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import PDFHeader from "@/components/PDFHeader";

interface GeneratedContent {
  id: string;
  type: string;
  title: string;
  content: any;
  status: 'generating' | 'completed' | 'error';
}

const ResultsPage = () => {
  const location = useLocation();
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [activeTab, setActiveTab] = useState("");

  // Mock data - in real app, this would come from API
  const mockContent = {
    'smart-summary': {
      title: 'Smart Summary',
      content: {
        keyPoints: [
          "Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience",
          "Supervised learning uses labeled training data to predict outcomes for new data",
          "Unsupervised learning finds hidden patterns in data without labeled examples",
          "Deep learning uses neural networks with multiple layers to process complex data",
          "Common applications include image recognition, natural language processing, and recommendation systems"
        ],
        overview: "This document covers the fundamentals of machine learning, including different types of learning algorithms, their applications, and key concepts that form the foundation of modern AI systems."
      }
    },
    'practice-questions': {
      title: 'Practice Questions',
      content: {
        questions: [
          {
            question: "What is the main difference between supervised and unsupervised learning?",
            options: [
              "Supervised learning uses labeled data, unsupervised learning doesn't",
              "Supervised learning is faster than unsupervised learning",
              "Supervised learning uses more data than unsupervised learning",
              "There is no difference between them"
            ],
            correct: 0,
            explanation: "Supervised learning algorithms learn from labeled training data to make predictions, while unsupervised learning finds patterns in data without labeled examples."
          },
          {
            question: "Which of the following is NOT a common application of machine learning?",
            options: [
              "Image recognition",
              "Natural language processing", 
              "Manual data entry",
              "Recommendation systems"
            ],
            correct: 2,
            explanation: "Manual data entry is a traditional task that doesn't require machine learning. ML is used for automation and pattern recognition tasks."
          },
          {
            question: "What characterizes deep learning compared to traditional machine learning?",
            options: [
              "It uses less data",
              "It uses neural networks with multiple layers",
              "It's always faster",
              "It doesn't require any training"
            ],
            correct: 1,
            explanation: "Deep learning uses neural networks with multiple hidden layers to learn complex patterns and representations from data."
          }
        ]
      }
    },
    'flashcards': {
      title: 'Flashcards',
      content: {
        cards: [
          {
            front: "Machine Learning",
            back: "A subset of artificial intelligence that enables systems to automatically learn and improve performance from experience without being explicitly programmed"
          },
          {
            front: "Supervised Learning",
            back: "A type of machine learning that uses labeled training data to learn a mapping from inputs to outputs"
          },
          {
            front: "Unsupervised Learning", 
            back: "A type of machine learning that finds hidden patterns or structures in data without labeled examples"
          },
          {
            front: "Deep Learning",
            back: "A subset of machine learning that uses artificial neural networks with multiple layers to model and understand complex patterns"
          },
          {
            front: "Neural Network",
            back: "A computing system inspired by biological neural networks, consisting of interconnected nodes (neurons) that process information"
          }
        ]
      }
    },
    'mind-map': {
      title: 'Mind Map',
      content: {
        centralTopic: "Machine Learning",
        branches: [
          {
            title: "Types of Learning",
            subtopics: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"]
          },
          {
            title: "Algorithms",
            subtopics: ["Linear Regression", "Decision Trees", "Neural Networks", "SVM"]
          },
          {
            title: "Applications",
            subtopics: ["Image Recognition", "NLP", "Recommendation Systems", "Autonomous Vehicles"]
          },
          {
            title: "Key Concepts",
            subtopics: ["Training Data", "Feature Engineering", "Model Validation", "Overfitting"]
          }
        ]
      }
    }
  };

  useEffect(() => {
    // Get selected options from navigation state or localStorage
    const selectedOptions = location.state?.selectedOptions || ['smart-summary', 'practice-questions'];
    
    // Initialize content with generating status
    const initialContent = selectedOptions.map((optionId: string) => ({
      id: optionId,
      type: optionId,
      title: mockContent[optionId as keyof typeof mockContent]?.title || 'Unknown',
      content: null,
      status: 'generating' as const
    }));

    setGeneratedContent(initialContent);
    setActiveTab(selectedOptions[0] || 'smart-summary');

    // Simulate content generation
    selectedOptions.forEach((optionId: string, index: number) => {
      setTimeout(() => {
        setGeneratedContent(prev => 
          prev.map(item => 
            item.id === optionId 
              ? { 
                  ...item, 
                  content: mockContent[optionId as keyof typeof mockContent]?.content,
                  status: 'completed' as const 
                }
              : item
          )
        );
      }, (index + 1) * 2000); // Stagger generation by 2 seconds each
    });
  }, [location.state]);

  const renderContent = (content: GeneratedContent) => {
    if (content.status === 'generating') {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-lg font-medium">Generating {content.title}...</p>
            <p className="text-muted-foreground">This may take a few moments</p>
          </div>
        </div>
      );
    }

    if (content.status === 'error') {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <XCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <p className="text-lg font-medium">Error generating {content.title}</p>
            <Button variant="outline" className="mt-4">Try Again</Button>
          </div>
        </div>
      );
    }

    // Render completed content based on type
    switch (content.type) {
      case 'smart-summary':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Overview</h3>
              <p className="text-muted-foreground">{content.content.overview}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Points</h3>
              <ul className="space-y-2">
                {content.content.keyPoints.map((point: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'practice-questions':
        return (
          <div className="space-y-6">
            {content.content.questions.map((q: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option: string, optIndex: number) => (
                      <div 
                        key={optIndex}
                        className={`p-3 rounded-lg border ${
                          optIndex === q.correct 
                            ? "bg-green-50 border-green-200 text-green-800" 
                            : "bg-muted"
                        }`}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                        {option}
                        {optIndex === q.correct && (
                          <CheckCircle className="w-4 h-4 text-green-600 inline ml-2" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm"><strong>Explanation:</strong> {q.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'flashcards':
        return (
          <div className="grid md:grid-cols-2 gap-4">
            {content.content.cards.map((card: any, index: number) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h4 className="font-bold text-lg mb-4 text-primary">{card.front}</h4>
                    <div className="border-t pt-4">
                      <p className="text-muted-foreground">{card.back}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'mind-map':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-primary text-white rounded-full text-xl font-bold mb-6">
                {content.content.centralTopic}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {content.content.branches.map((branch: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg text-center">{branch.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {branch.subtopics.map((subtopic: string, subIndex: number) => (
                        <li key={subIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>{subtopic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return <p>Content type not supported</p>;
    }
  };

  const getTabIcon = (type: string) => {
    switch (type) {
      case 'smart-summary': return <BookOpen className="w-4 h-4" />;
      case 'practice-questions': return <Brain className="w-4 h-4" />;
      case 'flashcards': return <FileText className="w-4 h-4" />;
      case 'mind-map': return <Layers className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PDFHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/generate"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK TO OPTIONS
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Generated Content
          </h1>
          <p className="text-xl text-muted-foreground">
            Your AI-generated study materials are ready
          </p>
        </div>

        {/* Content Tabs */}
        {generatedContent.length > 0 && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto">
              {generatedContent.map((content) => (
                <TabsTrigger 
                  key={content.id} 
                  value={content.id}
                  className="flex items-center gap-2 py-3 px-4"
                >
                  {getTabIcon(content.type)}
                  <span className="hidden md:inline">{content.title}</span>
                  {content.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  {content.status === 'generating' && (
                    <RefreshCw className="w-4 h-4 text-primary animate-spin" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {generatedContent.map((content) => (
              <TabsContent key={content.id} value={content.id} className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getTabIcon(content.type)}
                      {content.title}
                    </CardTitle>
                    {content.status === 'completed' && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {renderContent(content)}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-12">
          <Link to="/upload">
            <Button variant="outline" size="lg">
              Upload New Document
            </Button>
          </Link>
          <Button variant="gradient" size="lg">
            Generate More Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
