import { useEffect, useRef, useState } from "react";
import { Upload, Sparkles, Trophy } from "lucide-react";

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        
        if (scrollProgress < 0.3) {
          setActiveStep(1);
        } else if (scrollProgress < 0.6) {
          setActiveStep(2);
        } else {
          setActiveStep(3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      id: 1,
      icon: Upload,
      title: "Upload Lecture Slides or Notes",
      description: "Simply upload your study materials in PDF format or paste YouTube URLs. Our AI processes them instantly for you.",
      mockup: (
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 h-80 overflow-hidden">
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          
          <div className="mt-8 border-2 border-dashed border-primary/30 rounded-lg h-48 flex flex-col items-center justify-center bg-white/50 dark:bg-gray-800/50">
            <Upload className="h-12 w-12 text-primary mb-4" />
            <p className="text-sm text-muted-foreground">Choose Files or drag and drop</p>
          </div>
          
          <div className="absolute top-6 left-4 flex gap-2">
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">.PDF</div>
            <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded">.PPT</div>
            <div className="bg-red-600 text-white text-xs px-2 py-1 rounded">.MP4</div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: Sparkles,
      title: "Generate Study Materials",
      description: "Our AI automatically creates comprehensive study materials tailored to your content - from flashcards to mind maps.",
      mockup: (
        <div className="relative bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 h-80 overflow-hidden">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="w-full h-3 bg-primary/20 rounded mb-3"></div>
              <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
              <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-center w-full h-16 bg-primary/10 rounded mb-3">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
              <div className="w-2/3 h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm col-span-2">
              <div className="flex gap-2 mb-3">
                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
              <div className="w-4/5 h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: Trophy,
      title: "Gamified Learning",
      description: "Stay motivated with points, achievements, and progress tracking while mastering your study materials.",
      mockup: (
        <div className="relative bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 h-80 overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-4">
            <h4 className="font-bold text-sm mb-2">Leaderboard</h4>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((rank) => (
                <div key={rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">
                      {rank}
                    </span>
                    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{1000 + (6-rank) * 200} XP</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">110 days</span>
            </div>
            <div className="text-xs text-muted-foreground">Best: 221 days</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How StudyMind works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform any study material into an interactive learning experience with our AI-powered platform
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Steps */}
            <div className="space-y-8">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                
                return (
                  <div
                    key={step.id}
                    className={`transition-all duration-500 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="text-6xl font-bold text-primary">{step.id}.</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="h-6 w-6 text-primary" />
                          <h3 className="text-xl font-bold text-primary">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right side - Visual mockup */}
            <div className="sticky top-24">
              <div className="transition-all duration-500 ease-in-out">
                {steps.find(step => step.id === activeStep)?.mockup}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;