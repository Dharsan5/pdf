import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Share2, BookOpen, Brain, Layers, FileText, CheckCircle, XCircle, RefreshCw, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
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
  const [userAnswers, setUserAnswers] = useState<{[questionId: string]: string}>({});
  const [showResults, setShowResults] = useState<{[questionId: string]: boolean}>({});
  const [processingAnswer, setProcessingAnswer] = useState<{[questionId: string]: boolean}>({});
  const [flippedCards, setFlippedCards] = useState<{[cardId: string]: boolean}>({});
  
  // Practice exam state
  const [examStarted, setExamStarted] = useState(false);
  const [examTimeLeft, setExamTimeLeft] = useState(0);
  const [examAnswers, setExamAnswers] = useState<{[questionId: string]: string}>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  
  // AI Tutor state
  const [tutorQuery, setTutorQuery] = useState("");
  const [tutorMessages, setTutorMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Key Topics expansion state
  const [expandedTopics, setExpandedTopics] = useState<{[topicIndex: string]: boolean}>({});
  
  // Get document stats from navigation state
  const documentStats = location.state?.documentStats || {
    keyTopics: 15,
    quizQuestions: 30,
    pages: 24,
    words: 5847,
    concepts: 8
  };

  // Dynamic mock content based on document stats
  const generateMockContent = (contentType: string) => {
    switch (contentType) {
      case 'key-topics':
        return {
          title: 'Key Topics',
          content: {
            topics: Array.from({ length: documentStats.keyTopics }, (_, i) => ({
              id: i + 1,
              title: `Topic ${i + 1}: ${['Machine Learning Fundamentals', 'Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Data Preprocessing', 'Feature Engineering', 'Model Evaluation', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning', 'Ensemble Methods', 'Dimensionality Reduction', 'Clustering Algorithms', 'Classification Methods'][i] || `Advanced Topic ${i + 1}`}`,
              description: `Comprehensive overview of key concepts and methodologies related to topic ${i + 1}.`,
              keyPoints: [
                `Core principle ${i + 1}: Understanding the fundamental concepts`,
                `Application ${i + 1}: Real-world implementation strategies`,
                `Best practices ${i + 1}: Industry-standard approaches`
              ]
            }))
          }
        };
        
      case 'quiz':
        return {
          title: 'Quiz',
          content: {
            questions: Array.from({ length: Math.min(documentStats.quizQuestions, 10) }, (_, i) => ({
              question: `Question ${i + 1}: What is the primary concept discussed in section ${i + 1}?`,
              options: [
                "The correct answer that demonstrates understanding",
                "An incorrect but plausible option",
                "Another incorrect option",
                "A clearly wrong answer"
              ],
              correct: "A",
              explanation: `This question tests your understanding of the key concept presented in section ${i + 1} of the document.`
            })),
            totalQuestions: documentStats.quizQuestions
          }
        };
        
      case 'summary':
        return {
          title: 'Summary',
          content: {
            keyPoints: [
              `This ${documentStats.pages}-page document covers essential concepts across ${documentStats.keyTopics} main topics`,
              "Key methodologies and practical applications are thoroughly explained",
              "Industry best practices and real-world examples are provided",
              "The content builds progressively from basic to advanced concepts",
              `With ${documentStats.words.toLocaleString()} words, it provides comprehensive coverage of the subject matter`
            ],
            overview: `This document provides a comprehensive exploration of the subject matter across ${documentStats.pages} pages. The content is structured around ${documentStats.keyTopics} key topics, offering both theoretical foundations and practical applications. The material is suitable for learners at various levels and includes real-world examples and industry insights.`
          }
        };
        
      case 'flashcards':
        return {
          title: 'Flashcards',
          content: {
            cards: Array.from({ length: Math.min(documentStats.keyTopics * 2, 20) }, (_, i) => ({
              front: `Key Concept ${i + 1}`,
              back: `Detailed explanation of the important concept ${i + 1} as covered in the document. This includes practical applications and key insights.`
            }))
          }
        };
        
      case 'mind-map':
        return {
          title: 'Mind Map',
          content: {
            centralTopic: "Core Learning Framework",
            mainBranches: [
              {
                id: "theoretical",
                title: "Theoretical Foundation",
                color: "blue",
                icon: "📚",
                concepts: [
                  "Fundamental Principles",
                  "Core Methodologies", 
                  "Historical Context",
                  "Academic Research"
                ],
                connections: ["practical", "assessment"]
              },
              {
                id: "practical",
                title: "Practical Applications",
                color: "green",
                icon: "🛠️",
                concepts: [
                  "Real-world Implementation",
                  "Case Studies",
                  "Industry Examples",
                  "Problem Solving"
                ],
                connections: ["theoretical", "skills"]
              },
              {
                id: "skills",
                title: "Key Skills & Competencies",
                color: "purple",
                icon: "🎯",
                concepts: [
                  "Critical Thinking",
                  "Analysis & Synthesis",
                  "Communication",
                  "Technical Proficiency"
                ],
                connections: ["practical", "assessment"]
              },
              {
                id: "assessment",
                title: "Learning Assessment",
                color: "orange",
                icon: "📊",
                concepts: [
                  "Knowledge Verification",
                  "Skill Demonstration",
                  "Progress Tracking",
                  "Continuous Improvement"
                ],
                connections: ["theoretical", "skills"]
              }
            ],
            stats: {
              totalConcepts: documentStats.keyTopics,
              documentPages: documentStats.pages,
              practiceQuestions: documentStats.quizQuestions,
              estimatedStudyTime: Math.ceil(documentStats.pages / 3) + " hours"
            }
          }
        };
        
      case 'ai-tutor':
        return {
          title: 'AI Tutor',
          content: {
            chatReady: true,
            topicsCovered: documentStats.keyTopics,
            questionsAnswered: 0,
            availableHelp: [
              "Explain any concept from the document",
              "Provide additional examples",
              "Answer follow-up questions",
              "Create custom quizzes"
            ]
          }
        };
        
      case 'practice-exam':
        return {
          title: 'Practice Exam',
          content: {
            totalQuestions: Math.min(documentStats.quizQuestions, 20),
            timeLimit: Math.max(30, Math.min(documentStats.pages * 2, 60)), // 30-60 minutes based on content
            difficulty: "Mixed",
            questions: Array.from({ length: Math.min(documentStats.quizQuestions, 20) }, (_, i) => ({
              id: `exam_q${i}`,
              question: `Exam Question ${i + 1}: Based on the key concepts in this document, which statement best describes the relationship between the primary theory and its practical applications?`,
              options: [
                "The theory provides a comprehensive framework that directly translates to all practical scenarios",
                "Practical applications often require modifications and adaptations of the core theory",
                "The theory is purely academic and has no real-world relevance",
                "Practical applications contradict the fundamental principles of the theory"
              ],
              correct: ["A", "B", "C", "D"][i % 4],
              points: i < 5 ? 2 : i < 15 ? 3 : 5, // Easy questions: 2pts, Medium: 3pts, Hard: 5pts
              difficulty: i < 5 ? "Easy" : i < 15 ? "Medium" : "Hard"
            })),
            totalPoints: Array.from({ length: Math.min(documentStats.quizQuestions, 20) }, (_, i) => 
              i < 5 ? 2 : i < 15 ? 3 : 5
            ).reduce((sum, points) => sum + points, 0)
          }
        };
        
      default:
        return { title: 'Unknown Content', content: {} };
    }
  };

  useEffect(() => {
    // Clear all previous states when component mounts
    setUserAnswers({});
    setShowResults({});
    setProcessingAnswer({});
    setFlippedCards({});
    
    // Clear practice exam states
    setExamStarted(false);
    setExamTimeLeft(0);
    setExamAnswers({});
    setExamSubmitted(false);
    setExamScore(0);
    
    // Clear AI tutor states
    setTutorQuery("");
    setTutorMessages([]);
    setIsTyping(false);
    
    // Get selected options from navigation state
    const selectedOptions = location.state?.selectedOptions || ['quiz'];
    
    // Initialize content with generating status
    const initialContent = selectedOptions.map((optionId: string) => {
      const mockData = generateMockContent(optionId);
      return {
        id: optionId,
        type: optionId,
        title: mockData.title,
        content: null,
        status: 'generating' as const
      };
    });

    setGeneratedContent(initialContent);
    setActiveTab(selectedOptions[0] || 'quiz');

    // Simulate content generation
    selectedOptions.forEach((optionId: string, index: number) => {
      setTimeout(() => {
        const mockData = generateMockContent(optionId);
        setGeneratedContent(prev => 
          prev.map(item => 
            item.id === optionId 
              ? { 
                  ...item, 
                  content: mockData.content,
                  status: 'completed' as const 
                }
              : item
          )
        );
      }, (index + 1) * 1000); // Stagger generation by 1 second each (reduced from 2)
    });
  }, [location.state]);

  // Timer effect for practice exam
  useEffect(() => {
    if (examStarted && examTimeLeft > 0) {
      const timer = setTimeout(() => {
        setExamTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (examStarted && examTimeLeft === 0) {
      // Auto-submit exam when time runs out
      let score = 0;
      let totalPoints = 0;
      
      const currentContent = generatedContent.find(c => c.type === 'practice-exam');
      if (currentContent && currentContent.content) {
        currentContent.content.questions.forEach((q: any) => {
          totalPoints += q.points;
          if (examAnswers[q.id] === q.correct) {
            score += q.points;
          }
        });
        
        setExamScore(Math.round((score / totalPoints) * 100));
        setExamSubmitted(true);
        setExamStarted(false);
      }
    }
  }, [examStarted, examTimeLeft, examAnswers, generatedContent]);

  const toggleTopicExpansion = (topicIndex: number) => {
    setExpandedTopics(prev => ({
      ...prev,
      [`topic-${topicIndex}`]: !prev[`topic-${topicIndex}`]
    }));
  };

  // Share functionality
  const handleShare = async (contentType: string, content: any) => {
    const shareData = {
      title: `StudyMind - ${content.title || contentType}`,
      text: `Check out my study materials generated by StudyMind AI!`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert('Link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        alert('Sharing failed. Please copy the URL manually.');
      }
    }
  };

  // Download functionality
  const handleDownload = (contentType: string, content: any) => {
    let downloadContent = '';
    let fileName = `studymind-${contentType}.txt`;

    switch (contentType) {
      case 'key-topics':
        downloadContent = `StudyMind - Key Topics\n\n`;
        content.topics?.forEach((topic: any, index: number) => {
          downloadContent += `${index + 1}. ${topic.title}\n`;
          downloadContent += `   ${topic.description}\n`;
          downloadContent += `   Key Points:\n`;
          topic.keyPoints?.forEach((point: string) => {
            downloadContent += `   • ${point}\n`;
          });
          downloadContent += '\n';
        });
        break;

      case 'quiz':
        downloadContent = `StudyMind - Quiz Questions\n\n`;
        content.questions?.forEach((question: any, index: number) => {
          downloadContent += `Q${index + 1}: ${question.question}\n`;
          question.options?.forEach((option: string, optIndex: number) => {
            const letter = String.fromCharCode(65 + optIndex);
            downloadContent += `${letter}) ${option}\n`;
          });
          downloadContent += `Correct Answer: ${question.correct}\n`;
          downloadContent += `Explanation: ${question.explanation}\n\n`;
        });
        break;

      case 'summary':
        downloadContent = `StudyMind - Document Summary\n\n`;
        downloadContent += `Overview:\n${content.overview || ''}\n\n`;
        downloadContent += `Key Points:\n`;
        content.keyPoints?.forEach((point: string) => {
          downloadContent += `• ${point}\n`;
        });
        break;

      case 'flashcards':
        downloadContent = `StudyMind - Flashcards\n\n`;
        content.cards?.forEach((card: any, index: number) => {
          downloadContent += `Card ${index + 1}:\n`;
          downloadContent += `Front: ${card.front}\n`;
          downloadContent += `Back: ${card.back}\n\n`;
        });
        break;

      case 'practice-exam':
        downloadContent = `StudyMind - Practice Exam\n\n`;
        downloadContent += `Total Questions: ${content.totalQuestions}\n`;
        downloadContent += `Time Limit: ${content.timeLimit} minutes\n`;
        downloadContent += `Total Points: ${content.totalPoints}\n\n`;
        content.questions?.forEach((question: any, index: number) => {
          downloadContent += `Q${index + 1} (${question.points} pts - ${question.difficulty}): ${question.question}\n`;
          question.options?.forEach((option: string, optIndex: number) => {
            const letter = String.fromCharCode(65 + optIndex);
            downloadContent += `${letter}) ${option}\n`;
          });
          downloadContent += `Correct Answer: ${question.correct}\n\n`;
        });
        break;

      case 'ai-tutor':
        downloadContent = `StudyMind - AI Tutor Session\n\n`;
        tutorMessages.forEach((message, index) => {
          downloadContent += `${message.role === 'user' ? 'You' : 'AI Tutor'}: ${message.content}\n\n`;
        });
        break;

      default:
        downloadContent = `StudyMind - Study Material\n\nContent: ${JSON.stringify(content, null, 2)}`;
    }

    const blob = new Blob([downloadContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate more content functionality
  const handleGenerateMore = () => {
    // Navigate back to generation options with current document context
    const additionalOptions = [
      'key-topics',
      'quiz', 
      'summary',
      'flashcards',
      'practice-exam',
      'ai-tutor',
      'mind-map'
    ].filter(option => !generatedContent.some(content => content.type === option));

    if (additionalOptions.length === 0) {
      alert('All available content types have been generated! Upload a new document to create more study materials.');
      return;
    }

    // For demo purposes, add one more content type
    const nextContentType = additionalOptions[0];
    const mockData = generateMockContent(nextContentType);
    
    const newContent: GeneratedContent = {
      id: nextContentType,
      type: nextContentType,
      title: mockData.title,
      content: null,
      status: 'generating'
    };

    setGeneratedContent(prev => [...prev, newContent]);

    // Simulate generation
    setTimeout(() => {
      setGeneratedContent(prev => 
        prev.map(item => 
          item.id === nextContentType 
            ? { 
                ...item, 
                content: mockData.content,
                status: 'completed' as const 
              }
            : item
        )
      );
      
      // Switch to the new tab
      setActiveTab(nextContentType);
    }, 2000);
  };

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
      case 'key-topics':
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              {content.content.topics.map((topic: any, index: number) => {
                const isExpanded = expandedTopics[`topic-${index}`];
                return (
                  <Card key={index} className="transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleTopicExpansion(index)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-primary">{topic.title}</h4>
                            <p className="text-muted-foreground text-sm mt-1">
                              Click to {isExpanded ? 'hide' : 'show'} important points
                            </p>
                          </div>
                          <div className="ml-4">
                            <CheckCircle className={cn(
                              "w-5 h-5 transition-transform duration-200",
                              isExpanded ? "rotate-90 text-green-600" : "text-gray-400"
                            )} />
                          </div>
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                          <p className="text-muted-foreground mb-4">{topic.description}</p>
                          <div className="space-y-2">
                            <h5 className="font-semibold text-sm text-gray-700 mb-3">Important Points:</h5>
                            <ul className="space-y-2">
                              {topic.keyPoints.map((point: string, pointIndex: number) => (
                                <li key={pointIndex} className="flex items-start gap-3 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {/* Summary stats */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <BookOpen className="w-4 h-4" />
                <span className="font-medium">
                  {content.content.topics.length} key topics identified • 
                  Click any topic to explore its important points
                </span>
              </div>
            </div>
          </div>
        );

      case 'quiz':
        const handleQuizAnswerSelect = (questionIndex: number, selectedOption: string) => {
          const questionId = `q${questionIndex}`;
          setUserAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
          setProcessingAnswer(prev => ({ ...prev, [questionId]: true }));
          
          // Show result after a short delay to create suspense
          setTimeout(() => {
            setProcessingAnswer(prev => ({ ...prev, [questionId]: false }));
            setShowResults(prev => ({ ...prev, [questionId]: true }));
          }, 1500); // 1.5 second delay for AI thinking
        };

        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Total Questions Available:</strong> {content.content.totalQuestions} | 
                <strong> Showing:</strong> {content.content.questions.length} interactive questions
              </p>
            </div>
            {content.content.questions.map((q: any, index: number) => {
              const questionId = `q${index}`;
              const userAnswer = userAnswers[questionId];
              const showResult = showResults[questionId];
              const isProcessing = processingAnswer[questionId];
              const isCorrect = userAnswer === q.correct;

              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      Question {index + 1}
                      {showResult && !isProcessing && (
                        <div className={cn(
                          "flex items-center gap-2 text-sm font-medium",
                          isCorrect ? "text-green-600" : "text-red-600"
                        )}>
                          {isCorrect ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Correct!
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              Incorrect
                            </>
                          )}
                        </div>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-medium">{q.question}</p>
                    <div className="space-y-3">
                      {q.options.map((option: string, optionIndex: number) => {
                        const optionLetter = String.fromCharCode(65 + optionIndex); // A, B, C, D
                        const isSelected = userAnswer === optionLetter;
                        const isCorrectOption = optionLetter === q.correct;
                        
                        // Only show colors and icons after user has selected AND processing is complete
                        const showOptionResult = showResult && !isProcessing;
                        
                        return (
                          <button
                            key={optionIndex}
                            onClick={() => handleQuizAnswerSelect(index, optionLetter)}
                            disabled={showResult || isProcessing}
                            className={cn(
                              "w-full p-4 text-left border rounded-lg transition-all flex items-center space-x-3",
                              isProcessing && isSelected
                                ? "border-primary bg-primary/5 cursor-not-allowed"
                                : showOptionResult
                                ? isCorrectOption
                                  ? "border-green-500 bg-green-50 text-green-800"
                                  : isSelected
                                  ? "border-red-500 bg-red-50 text-red-800"
                                  : "border-gray-200 bg-gray-50 text-gray-600"
                                : isSelected && !isProcessing
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            )}
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium">
                              {isProcessing && isSelected ? (
                                <RefreshCw className="w-3 h-3 animate-spin" />
                              ) : showOptionResult ? (
                                isCorrectOption ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : isSelected ? (
                                  <XCircle className="w-4 h-4 text-red-600" />
                                ) : (
                                  optionLetter
                                )
                              ) : (
                                optionLetter
                              )}
                            </div>
                            <span className="flex-1">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                    {showResult && !isProcessing && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm"><strong>Explanation:</strong> {q.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        );

      case 'summary':
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

      case 'ai-tutor':
        const handleTutorSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!tutorQuery.trim()) return;

          const userMessage = { role: 'user' as const, content: tutorQuery };
          setTutorMessages(prev => [...prev, userMessage]);
          setIsTyping(true);
          setTutorQuery("");

          // Simulate AI response
          setTimeout(() => {
            const aiResponse = {
              role: 'assistant' as const,
              content: generateTutorResponse(tutorQuery)
            };
            setTutorMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
          }, 1500);
        };

        const generateTutorResponse = (query: string) => {
          const queryLower = query.toLowerCase();
          
          // Detect the type of question and provide specific responses
          if (queryLower.includes('main concept') || queryLower.includes('explain the main')) {
            return `## Understanding the Main Concept

**Core Theory:** The document establishes that effective learning occurs through structured knowledge acquisition combined with practical application. This forms the foundation for all subsequent learning strategies.

**Key Components:**
• **Theoretical Framework:** The underlying principles provide a systematic approach to understanding complex topics
• **Practical Application:** Real-world implementation ensures knowledge retention and skill development
• **Progressive Learning:** Building from basic concepts to advanced applications creates lasting comprehension

**Why This Matters:** This main concept is crucial because it bridges the gap between theoretical knowledge and practical skills. Students who master this approach see 3x better retention rates and improved problem-solving abilities.

**Connection to Your Study:** In your current document (${documentStats.pages} pages covering ${documentStats.keyTopics} topics), this concept appears in multiple forms throughout the material, making it essential for comprehensive understanding.`;
          }
          
          if (queryLower.includes('example') || queryLower.includes('give me example')) {
            return `## Practical Examples & Applications

**Real-World Example 1: Educational Technology**
Consider how AI-powered learning platforms work:
• Input: Student uploads a PDF document
• Processing: AI analyzes content and identifies key concepts
• Output: Generated quizzes, summaries, and interactive materials
• Result: Personalized learning experience with improved comprehension

**Real-World Example 2: Professional Development**
In corporate training scenarios:
• Traditional Method: Reading lengthy manuals (low retention ~20%)
• Enhanced Method: Interactive content with quizzes and flashcards (retention ~80%)
• Outcome: Employees demonstrate significantly better performance

**Industry Applications:**
• **Healthcare:** Medical students use interactive learning for complex procedures
• **Technology:** Software developers learn new frameworks through hands-on examples
• **Finance:** Analysts practice with real market scenarios and case studies

**Your Document Context:** 
With ${documentStats.words.toLocaleString()} words across ${documentStats.pages} pages, these examples demonstrate how the concepts in your material can be applied across multiple industries and learning scenarios.`;
          }
          
          if (queryLower.includes('key point') || queryLower.includes('important') || queryLower.includes('summary')) {
            return `## Key Points & Critical Insights

**Most Important Takeaways:**

**1. Foundation Building (Critical)**
The document emphasizes that solid foundational understanding is prerequisite for advanced learning. Without this base, students struggle with complex applications.

**2. Active Learning Methodology**
• Interactive engagement increases retention by 65%
• Passive reading achieves only 10% long-term retention
• Combined approaches (reading + practice + testing) achieve 90% retention

**3. Adaptive Learning Pathways**
The material suggests that personalized learning paths based on individual progress and understanding levels lead to optimal outcomes.

**4. Assessment Integration**
Regular testing and feedback loops are not just evaluation tools but learning accelerators that reinforce knowledge acquisition.

**5. Practical Application Focus**
Theory without practice leads to knowledge decay. The document shows that immediate application of learned concepts solidifies understanding.

**Your Study Statistics:**
• Document Length: ${documentStats.pages} pages
• Key Topics Covered: ${documentStats.keyTopics}
• Estimated Reading Time: ${Math.round(documentStats.words / 250)} minutes
• Recommended Study Sessions: ${Math.ceil(documentStats.pages / 5)} sessions

**Action Items for Your Learning:**
1. Review each key concept with the provided examples
2. Complete practice questions to test understanding
3. Use flashcards for memorization of critical terms
4. Take the practice exam to assess overall comprehension`;
          }
          
          if (queryLower.includes('how') || queryLower.includes('practice') || queryLower.includes('apply')) {
            return `## How to Apply This Knowledge

**Step-by-Step Implementation:**

**Phase 1: Foundation (Week 1)**
• Start with the summary to get overview understanding
• Review key topics systematically (spend 15-20 minutes per topic)
• Use flashcards for terminology and definitions
• Complete initial quiz to identify knowledge gaps

**Phase 2: Deep Learning (Week 2-3)**
• Focus on areas identified as weak in initial assessment
• Practice with interactive questions and get immediate feedback
• Connect concepts to real-world applications you're familiar with
• Create mind maps to visualize relationships between concepts

**Phase 3: Mastery & Assessment (Week 4)**
• Take the full practice exam under timed conditions
• Review incorrect answers and understand the reasoning
• Use AI tutor for clarification on difficult concepts
• Apply knowledge to practical scenarios or projects

**Daily Study Routine:**
• 10 minutes: Review previous day's material
• 25 minutes: New content study
• 10 minutes: Practice questions
• 5 minutes: Flashcard review

**Success Metrics:**
• Quiz scores improving by 10% each week
• Ability to explain concepts without referring to notes
• Successfully completing practice exam with 80%+ score
• Confidence in applying knowledge to new situations

**Based on Your Document:**
With ${documentStats.quizQuestions} available practice questions and ${documentStats.keyTopics} major topics, you have comprehensive resources for thorough preparation.`;
          }
          
          // Default comprehensive response for other questions
          return `## Comprehensive Analysis: "${query}"

**In-Depth Explanation:**
Your question touches on important aspects covered in this ${documentStats.pages}-page document. Let me provide a thorough analysis based on the material.

**Core Concept Analysis:**
The topic you've asked about relates to fundamental principles that appear throughout the document. These concepts are interconnected with ${documentStats.keyTopics} major themes, creating a comprehensive learning framework.

**Detailed Breakdown:**
• **Theoretical Foundation:** The underlying principles establish clear guidelines for understanding
• **Practical Applications:** Real-world implementations demonstrate the concept's value
• **Supporting Evidence:** The document provides multiple examples and case studies
• **Learning Outcomes:** Students who master this concept show improved performance

**Connections & Relationships:**
This concept doesn't exist in isolation. It connects to other topics in the document through:
- Shared methodological approaches
- Common practical applications  
- Overlapping skill requirements
- Complementary knowledge areas

**Advanced Insights:**
For deeper understanding, consider how this concept:
- Evolved from earlier theories or practices
- Addresses specific challenges in the field
- Provides solutions that weren't available before
- Opens pathways for future development

**Next Steps for Learning:**
1. Review related sections in pages covering similar topics
2. Practice with the ${documentStats.quizQuestions} available questions
3. Create connections with your existing knowledge
4. Apply these insights to practical scenarios

**Study Resources Available:**
- Interactive quizzes for self-assessment
- Flashcards for key terminology
- Practice exam for comprehensive testing
- AI tutor for ongoing support

Would you like me to elaborate on any specific aspect of this explanation?`;
        };

  const clearChat = () => {
    setTutorMessages([]);
    setTutorQuery("");
  };

        return (
          <div className="space-y-6">
            {/* AI Tutor Header */}
            <div className="text-center py-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">AI Tutor Assistant</h3>
              <p className="text-muted-foreground mb-4">
                Ask me anything about the document content - I'm here to help you learn!
              </p>
              <div className="grid md:grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <h4 className="font-medium text-sm mb-1">Topics Covered</h4>
                  <p className="text-lg font-bold text-blue-600">{content.content.topicsCovered}</p>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <h4 className="font-medium text-sm mb-1">Questions Asked</h4>
                  <p className="text-lg font-bold text-green-600">{tutorMessages.filter(m => m.role === 'user').length}</p>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <h4 className="font-medium text-sm mb-1">Responses Given</h4>
                  <p className="text-lg font-bold text-purple-600">{tutorMessages.filter(m => m.role === 'assistant').length}</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Ask Your Question or Doubt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTutorSubmit} className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={tutorQuery}
                        onChange={(e) => setTutorQuery(e.target.value)}
                        placeholder="Ask me anything about the document content..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        disabled={isTyping}
                      />
                      {tutorQuery && (
                        <button
                          type="button"
                          onClick={() => setTutorQuery("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      disabled={!tutorQuery.trim() || isTyping}
                      className="px-6"
                    >
                      {isTyping ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        "Ask"
                      )}
                    </Button>
                  </div>
                  
                  {/* Quick suggestion buttons */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground">Quick questions:</span>
                    {[
                      "Explain the main concept",
                      "Give me examples",
                      "What are the key points?",
                      "How does this apply in practice?"
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setTutorQuery(suggestion)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                        disabled={isTyping}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </form>

                {tutorMessages.length > 0 && (
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" onClick={clearChat}>
                      Clear Chat
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chat Messages */}
            {tutorMessages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Conversation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {tutorMessages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex gap-3",
                          message.role === 'user' ? "justify-end" : "justify-start"
                        )}
                      >
                        {message.role === 'assistant' && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Brain className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[85%] p-4 rounded-lg",
                            message.role === 'user'
                              ? "bg-primary text-primary-foreground ml-12"
                              : "bg-gray-100 text-gray-800"
                          )}
                        >
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content.split('\n').map((line, lineIndex) => {
                              if (line.startsWith('## ')) {
                                return (
                                  <h3 key={lineIndex} className="text-lg font-bold mb-2 text-blue-800">
                                    {line.replace('## ', '')}
                                  </h3>
                                );
                              }
                              if (line.startsWith('**') && line.endsWith('**')) {
                                return (
                                  <h4 key={lineIndex} className="font-semibold mt-3 mb-1 text-gray-700">
                                    {line.replace(/\*\*/g, '')}
                                  </h4>
                                );
                              }
                              if (line.startsWith('• ')) {
                                return (
                                  <div key={lineIndex} className="ml-4 mb-1 flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>{line.replace('• ', '')}</span>
                                  </div>
                                );
                              }
                              if (line.trim() === '') {
                                return <br key={lineIndex} />;
                              }
                              return (
                                <p key={lineIndex} className="mb-2">
                                  {line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, partIndex) => {
                                    if (partIndex === 0) return part;
                                    const [bold, rest] = part.split('</strong>');
                                    return (
                                      <span key={partIndex}>
                                        <strong className="font-semibold">{bold}</strong>
                                        {rest}
                                      </span>
                                    );
                                  })}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                        {message.role === 'user' && (
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-primary">You</span>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-1">
                            <span className="text-sm">AI is thinking</span>
                            <div className="flex gap-1">
                              <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Help Section */}
            {tutorMessages.length === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>What I Can Help With</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {content.content.availableHelp.map((help: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{help}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">💡 Pro Tips:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Be specific with your questions for better answers</li>
                      <li>• Ask for examples to understand concepts better</li>
                      <li>• Request explanations in simpler terms if needed</li>
                      <li>• Ask follow-up questions to dive deeper</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'practice-exam':
        const startExam = () => {
          // Only start if content and questions are available
          if (!content.content?.questions || content.content.questions.length === 0) {
            console.error('No questions available for exam');
            return;
          }
          
          setExamStarted(true);
          setExamTimeLeft(content.content.timeLimit * 60); // Convert minutes to seconds
          setExamAnswers({});
          setExamSubmitted(false);
          setExamScore(0);
        };

        const submitExam = () => {
          let score = 0;
          let totalPoints = 0;
          
          content.content.questions.forEach((q: any) => {
            totalPoints += q.points;
            if (examAnswers[q.id] === q.correct) {
              score += q.points;
            }
          });
          
          setExamScore(Math.round((score / totalPoints) * 100));
          setExamSubmitted(true);
          setExamStarted(false);
        };

        const handleExamAnswer = (questionId: string, answer: string) => {
          setExamAnswers(prev => ({
            ...prev,
            [questionId]: answer
          }));
        };

        const formatTime = (seconds: number) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        if (examSubmitted) {
          const totalQuestions = content.content.questions.length;
          const correctAnswers = content.content.questions.filter((q: any) => examAnswers[q.id] === q.correct).length;
          
          return (
            <div className="space-y-6">
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-green-800">Exam Completed!</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-6xl font-bold text-green-600">{examScore}%</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{correctAnswers}</div>
                      <div className="text-sm text-muted-foreground">Correct Answers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{totalQuestions - correctAnswers}</div>
                      <div className="text-sm text-muted-foreground">Incorrect Answers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-600">{totalQuestions}</div>
                      <div className="text-sm text-muted-foreground">Total Questions</div>
                    </div>
                  </div>
                  <Button onClick={startExam} className="mt-4">
                    Retake Exam
                  </Button>
                </CardContent>
              </Card>
              
              {/* Answer Review */}
              <Card>
                <CardHeader>
                  <CardTitle>Answer Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.content.questions.map((q: any, index: number) => {
                    const userAnswer = examAnswers[q.id];
                    const isCorrect = userAnswer === q.correct;
                    
                    return (
                      <div key={q.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Question {index + 1}</h4>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                              {isCorrect ? `+${q.points} pts` : '0 pts'}
                            </span>
                            {isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                        </div>
                        <p className="mb-3">{q.question}</p>
                        <div className="space-y-2">
                          {q.options.map((option: string, optIndex: number) => {
                            const optionLetter = String.fromCharCode(65 + optIndex);
                            const isUserChoice = userAnswer === optionLetter;
                            const isCorrectAnswer = optionLetter === q.correct;
                            
                            return (
                              <div
                                key={optIndex}
                                className={cn(
                                  "p-2 rounded border text-sm",
                                  isCorrectAnswer ? "bg-green-100 border-green-300" : 
                                  isUserChoice ? "bg-red-100 border-red-300" : "bg-gray-50 border-gray-200"
                                )}
                              >
                                <span className="font-medium">{optionLetter}. </span>
                                {option}
                                {isCorrectAnswer && <span className="text-green-600 ml-2">(Correct)</span>}
                                {isUserChoice && !isCorrectAnswer && <span className="text-red-600 ml-2">(Your Answer)</span>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          );
        }

        if (examStarted) {
          const progress = ((content.content.timeLimit * 60 - examTimeLeft) / (content.content.timeLimit * 60)) * 100;
          const answeredCount = Object.keys(examAnswers).length;
          
          return (
            <div className="space-y-6">
              {/* Timer and Progress */}
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-orange-600">{formatTime(examTimeLeft)}</div>
                      <div className="text-sm text-orange-700">Time Remaining</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-blue-600">{answeredCount}/{content.content.totalQuestions}</div>
                      <div className="text-sm text-blue-700">Answered</div>
                    </div>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              {/* Exam Questions */}
              <div className="space-y-6">
                {content.content.questions && content.content.questions.length > 0 ? (
                  content.content.questions.map((q: any, index: number) => (
                    <Card key={q.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Question {index + 1}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {q.points} points
                            </span>
                            <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {q.difficulty}
                            </span>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="font-medium">{q.question}</p>
                        <div className="space-y-2">
                          {q.options.map((option: string, optIndex: number) => {
                            const optionLetter = String.fromCharCode(65 + optIndex);
                            const isSelected = examAnswers[q.id] === optionLetter;
                            
                            return (
                              <button
                                key={optIndex}
                                onClick={() => handleExamAnswer(q.id, optionLetter)}
                                className={cn(
                                  "w-full p-3 text-left border rounded-lg transition-all flex items-center space-x-3",
                                  isSelected
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                )}
                              >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium">
                                  {optionLetter}
                                </div>
                                <span className="flex-1">{option}</span>
                              </button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No questions available for this exam.</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button 
                  onClick={submitExam}
                  size="lg"
                  className="px-8"
                  disabled={Object.keys(examAnswers).length === 0}
                >
                  Submit Exam
                </Button>
              </div>
            </div>
          );
        }

        // Pre-exam state
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{content.content.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{content.content.timeLimit}</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{content.content.totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-500">{content.content.difficulty}</div>
                  <div className="text-sm text-muted-foreground">Difficulty</div>
                </div>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Practice Exam Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Answer all {content.content.totalQuestions} questions within {content.content.timeLimit} minutes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Questions are worth different points based on difficulty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Your progress and remaining time will be displayed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Review your answers and see detailed results after submission</span>
                  </li>
                </ul>
                
                <div className="text-center pt-4">
                  <Button 
                    onClick={startExam} 
                    size="lg" 
                    className="px-8"
                    disabled={!content.content?.questions || content.content.questions.length === 0}
                  >
                    {content.content?.questions && content.content.questions.length > 0 
                      ? 'Start Practice Exam' 
                      : 'Loading Exam Questions...'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'practice-questions':
        const handleAnswerSelect = (questionIndex: number, selectedOption: string) => {
          const questionId = `q${questionIndex}`;
          setUserAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
          setProcessingAnswer(prev => ({ ...prev, [questionId]: true }));
          
          // Show result after a short delay to create suspense
          setTimeout(() => {
            setProcessingAnswer(prev => ({ ...prev, [questionId]: false }));
            setShowResults(prev => ({ ...prev, [questionId]: true }));
          }, 1500); // 1.5 second delay for AI thinking
        };

        return (
          <div className="space-y-6">
            {content.content.questions.map((q: any, index: number) => {
              const questionId = `q${index}`;
              const userAnswer = userAnswers[questionId];
              const showResult = showResults[questionId];
              const isProcessing = processingAnswer[questionId];
              const isCorrect = userAnswer === q.correct;

              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      Question {index + 1}
                      {showResult && !isProcessing && (
                        <div className={cn(
                          "flex items-center gap-2 text-sm font-medium",
                          isCorrect ? "text-green-600" : "text-red-600"
                        )}>
                          {isCorrect ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Correct!
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              Incorrect
                            </>
                          )}
                        </div>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-medium">{q.question}</p>
                    <div className="space-y-3">
                      {q.options.map((option: string, optionIndex: number) => {
                        const optionLetter = String.fromCharCode(65 + optionIndex); // A, B, C, D
                        const isSelected = userAnswer === optionLetter;
                        const isCorrectOption = optionLetter === q.correct;
                        
                        // Only show colors and icons after user has selected AND processing is complete
                        const showOptionResult = showResult && !isProcessing;
                        
                        return (
                          <button
                            key={optionIndex}
                            onClick={() => handleAnswerSelect(index, optionLetter)}
                            disabled={showResult || isProcessing}
                            className={cn(
                              "w-full p-4 text-left border rounded-lg transition-all flex items-center space-x-3",
                              isProcessing && isSelected
                                ? "border-primary bg-primary/5 cursor-not-allowed"
                                : showOptionResult
                                ? isCorrectOption
                                  ? "border-green-500 bg-green-50 text-green-800"
                                  : isSelected
                                  ? "border-red-500 bg-red-50 text-red-800"
                                  : "border-gray-200 bg-gray-50 text-gray-600"
                                : isSelected && !isProcessing
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            )}
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium">
                              {isProcessing && isSelected ? (
                                <RefreshCw className="w-3 h-3 animate-spin" />
                              ) : showOptionResult ? (
                                isCorrectOption ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : isSelected ? (
                                  <XCircle className="w-4 h-4 text-red-600" />
                                ) : (
                                  optionLetter
                                )
                              ) : (
                                optionLetter
                              )}
                            </div>
                            <span className="flex-1">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                    {showResult && !isProcessing && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm"><strong>Explanation:</strong> {q.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        );

      case 'flashcards':
        const handleCardFlip = (cardIndex: number) => {
          const cardId = `card_${cardIndex}`;
          setFlippedCards(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
          }));
        };

        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.content.cards.map((card: any, index: number) => {
              const cardId = `card_${index}`;
              const isFlipped = flippedCards[cardId] || false;
              
              return (
                <div
                  key={index}
                  className="relative h-48 cursor-pointer perspective-1000"
                  onClick={() => handleCardFlip(index)}
                >
                  <div
                    className={cn(
                      "relative w-full h-full transition-transform duration-700 transform-style-preserve-3d",
                      isFlipped ? "rotate-y-180" : ""
                    )}
                  >
                    {/* Front of card */}
                    <Card className="absolute inset-0 backface-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors">
                      <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center">
                        <div className="space-y-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Brain className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="font-bold text-lg text-primary">{card.front}</h4>
                          <p className="text-sm text-muted-foreground">Click to reveal answer</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Back of card */}
                    <Card className="absolute inset-0 backface-hidden rotate-y-180 border-2 border-green-200 bg-green-50">
                      <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center">
                        <div className="space-y-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="space-y-3">
                            <h5 className="font-semibold text-green-800 text-sm uppercase tracking-wide">Answer</h5>
                            <p className="text-green-700 leading-relaxed">{card.back}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'mind-map':
        const getColorClasses = (color: string) => {
          const colors = {
            blue: "bg-blue-500 border-blue-200 text-blue-800",
            green: "bg-green-500 border-green-200 text-green-800", 
            purple: "bg-purple-500 border-purple-200 text-purple-800",
            orange: "bg-orange-500 border-orange-200 text-orange-800"
          };
          return colors[color as keyof typeof colors] || "bg-gray-500 border-gray-200 text-gray-800";
        };

        const getBgColorClasses = (color: string) => {
          const bgColors = {
            blue: "bg-blue-50 border-blue-200",
            green: "bg-green-50 border-green-200", 
            purple: "bg-purple-50 border-purple-200",
            orange: "bg-orange-50 border-orange-200"
          };
          return bgColors[color as keyof typeof bgColors] || "bg-gray-50 border-gray-200";
        };

        return (
          <div className="space-y-8">
            {/* Mind Map Header with Stats */}
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Interactive Learning Mind Map</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-lg font-bold text-blue-600">{content.content.stats.totalConcepts}</div>
                  <div className="text-xs text-gray-600">Key Topics</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-lg font-bold text-green-600">{content.content.stats.documentPages}</div>
                  <div className="text-xs text-gray-600">Pages</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-lg font-bold text-purple-600">{content.content.stats.practiceQuestions}</div>
                  <div className="text-xs text-gray-600">Questions</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-lg font-bold text-orange-600">{content.content.stats.estimatedStudyTime}</div>
                  <div className="text-xs text-gray-600">Study Time</div>
                </div>
              </div>
            </div>

            {/* Central Topic */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-48 h-24 bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🧠</div>
                    <div className="text-lg font-bold">{content.content.centralTopic}</div>
                  </div>
                </div>
                
                {/* Connection lines */}
                <div className="absolute top-full left-1/2 w-0.5 h-8 bg-gray-300 transform -translate-x-1/2"></div>
                <div className="absolute top-full left-1/2 w-full h-0.5 bg-gray-300 transform -translate-x-1/2 translate-y-8"></div>
              </div>
            </div>

            {/* Main Branches */}
            <div className="grid md:grid-cols-2 gap-8 relative">
              {content.content.mainBranches.map((branch: any, index: number) => (
                <div key={branch.id} className="relative">
                  {/* Branch connector line */}
                  <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-300 transform -translate-x-1/2"></div>
                  
                  <Card className={`${getBgColorClasses(branch.color)} border-2 hover:shadow-lg transition-shadow`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-center gap-3">
                        <div className={`w-12 h-12 ${getColorClasses(branch.color).split(' ')[0]} text-white rounded-full flex items-center justify-center text-xl shadow-md`}>
                          {branch.icon}
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{branch.title}</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {branch.concepts.map((concept: string, conceptIndex: number) => (
                          <div 
                            key={conceptIndex}
                            className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className={`w-3 h-3 ${getColorClasses(branch.color).split(' ')[0]} rounded-full flex-shrink-0`}></div>
                            <span className="text-sm font-medium text-gray-700">{concept}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Connection indicators */}
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-500 mb-2">Connected to:</div>
                        <div className="flex flex-wrap gap-1">
                          {branch.connections.map((connectionId: string, connIndex: number) => {
                            const connectedBranch = content.content.mainBranches.find((b: any) => b.id === connectionId);
                            return (
                              <span 
                                key={connIndex}
                                className={`text-xs px-2 py-1 ${getBgColorClasses(connectedBranch?.color || 'gray')} border rounded-full`}
                              >
                                {connectedBranch?.icon} {connectedBranch?.title.split(' ')[0]}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Learning Path Suggestion */}
            <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                    🗺️
                  </div>
                  Suggested Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {content.content.mainBranches.map((branch: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">{branch.title}</div>
                        <div className="text-gray-500 text-xs">{branch.concepts.length} concepts</div>
                      </div>
                      {index < content.content.mainBranches.length - 1 && (
                        <div className="hidden md:block w-4 h-0.5 bg-indigo-300 ml-2"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">
                    📚 <strong>Tip:</strong> Follow this path for optimal learning: Start with theoretical foundation, 
                    then explore practical applications, develop key skills, and conclude with assessment to measure your progress.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <p>Content type not supported</p>;
    }
  };

  const getTabIcon = (type: string) => {
    switch (type) {
      case 'key-topics': return <BookOpen className="w-4 h-4" />;
      case 'quiz': return <Brain className="w-4 h-4" />;
      case 'summary': return <FileText className="w-4 h-4" />;
      case 'flashcards': return <FileText className="w-4 h-4" />;
      case 'mind-map': return <Layers className="w-4 h-4" />;
      case 'smart-summary': return <BookOpen className="w-4 h-4" />;
      case 'practice-questions': return <Brain className="w-4 h-4" />;
      case 'practice-exam': return <CheckCircle className="w-4 h-4" />;
      case 'ai-tutor': return <MessageSquare className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
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
        {generatedContent.length > 0 ? (
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShare(content.type, content.content)}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload(content.type, content.content)}
                        >
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
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
              <p className="text-lg font-medium">Loading content...</p>
              <p className="text-muted-foreground">This may take a few moments</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-12">
          <Link to="/upload">
            <Button variant="outline" size="lg">
              Upload New Document
            </Button>
          </Link>
          <Button 
            variant="gradient" 
            size="lg"
            onClick={handleGenerateMore}
          >
            Generate More Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
