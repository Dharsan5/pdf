import { Button } from "@/components/ui/button";
import { Users, FileText, Star, GraduationCap, GitCompare, Library, HelpCircle, BookOpen, MessageSquare, FileCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";

const PDFHero = () => {
  const [activeTab, setActiveTab] = useState("keytopics");

  const tabs = [
    { id: "keytopics", label: "Key Topics", icon: BookOpen },
    { id: "quiz", label: "Quiz", icon: HelpCircle },
    { id: "summary", label: "Summary", icon: FileCheck },
    { id: "exams", label: "Exams", icon: GraduationCap },
    { id: "mindmaps", label: "Mind Maps", icon: GitCompare },
    { id: "flashcards", label: "Flashcards", icon: Library },
    { id: "aitutor", label: "AI Tutor", icon: MessageSquare },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-orange-500">Learn 10x faster with AI for</span>{" "}
            <span className="text-primary relative">
              Your Exams
              <svg
                className="absolute left-0 top-full w-full h-3 text-primary/30"
                viewBox="0 0 418 42"
                fill="currentColor"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed">
            Transform any PDF into key topics, quiz , and summary with one click.
          </p>

          {/* CTA Button */}
          <div className="mb-12">
            <Link to="/upload">
              <Button variant="gradient" size="xl" className="min-w-[250px]">
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            {/* Avatar Group */}
            <div className="flex -space-x-3">
              {[avatar1, avatar2, avatar3, avatar4].map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Student ${index + 1}`}
                  className="w-12 h-12 rounded-full border-2 border-background shadow-soft hover:scale-110 transition-transform"
                />
              ))}
            </div>
          </div>

          {/* Feature Tabs */}
          <div className="w-full max-w-6xl">
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-primary text-black shadow-glow"
                        : "bg-card/50 text-foreground hover:bg-card/80 backdrop-blur-sm"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Preview */}
            <div className="bg-card/20 backdrop-blur-md rounded-2xl p-8 border border-foreground/10 shadow-soft">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  {activeTab === "exams" && "Practice Exams"}
                  {activeTab === "mindmaps" && "Interactive Mind Maps"}
                  {activeTab === "flashcards" && "Smart Flashcard System"}
                  {activeTab === "quiz" && "Interactive Quiz Generator"}
                  {activeTab === "keytopics" && "Key Topics Extraction"}
                  {activeTab === "aitutor" && "AI-Powered Personal Tutor"}
                  {activeTab === "summary" && "Intelligent Document Summary"}
                </h3>
                <p className="text-muted-foreground">
                  {activeTab === "exams" && "Create comprehensive practice tests from any PDF document with AI-powered question generation."}
                  {activeTab === "mindmaps" && "Visualize complex information with automatically generated mind maps and concept connections."}
                  {activeTab === "flashcards" && "Generate intelligent flashcards with spaced repetition for optimal learning efficiency."}
                  {activeTab === "quiz" && "Generate interactive quizzes with multiple choice, true/false, and fill-in-the-blank questions from your study materials."}
                  {activeTab === "keytopics" && "Automatically identify and extract the most important topics and concepts from your documents for focused learning."}
                  {activeTab === "aitutor" && "Chat with an AI tutor that understands your study materials and provides personalized explanations and guidance."}
                  {activeTab === "summary" && "Get concise, comprehensive summaries of lengthy documents while preserving all critical information."}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PDFHero;