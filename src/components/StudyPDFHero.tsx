import { Button } from "@/components/ui/button";
import { Users, FileText, Star, GraduationCap, GitCompare, Library } from "lucide-react";
import { useState } from "react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";

const StudyPDFHero = () => {
  const [activeTab, setActiveTab] = useState("exams");

  const tabs = [
    { id: "exams", label: "Exams", icon: GraduationCap },
    { id: "mindmaps", label: "Mind Maps", icon: GitCompare },
    { id: "flashcards", label: "Flashcards", icon: Library },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Lecturer Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-primary/10 border border-primary/20 rounded-full px-6 py-2 text-sm font-medium text-primary backdrop-blur-sm hover:bg-primary/15 transition-colors cursor-pointer">
              <span className="mr-2">👨‍🏫</span>
              Lecturer? Visit Lecturer Page
              <span className="ml-2">→</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            Learn 10x faster with AI for{" "}
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
            Transform any PDF into flashcards, practice tests, and mind maps with one click.
          </p>

          {/* CTA Button */}
          <div className="mb-12">
            <Button variant="gradient" size="xl" className="min-w-[250px]">
              Start Learning for Free
            </Button>
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

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="font-semibold text-foreground">40,000+</span>
                <span>Students</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="font-semibold text-foreground">150K+</span>
                <span>Documents</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-semibold text-foreground">4.8/5</span>
                <span>Rating</span>
              </div>
            </div>
          </div>

          {/* Feature Tabs */}
          <div className="w-full max-w-4xl">
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
                  {activeTab === "exams" && "AI-Generated Practice Exams"}
                  {activeTab === "mindmaps" && "Interactive Mind Maps"}
                  {activeTab === "flashcards" && "Smart Flashcard System"}
                </h3>
                <p className="text-muted-foreground">
                  {activeTab === "exams" && "Create comprehensive practice tests from any PDF document with AI-powered question generation."}
                  {activeTab === "mindmaps" && "Visualize complex information with automatically generated mind maps and concept connections."}
                  {activeTab === "flashcards" && "Generate intelligent flashcards with spaced repetition for optimal learning efficiency."}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StudyPDFHero;