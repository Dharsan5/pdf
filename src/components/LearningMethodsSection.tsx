import { useEffect, useRef, useState } from "react";

const LearningMethodsSection = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const progress = Math.min(
          Math.max((window.innerHeight - rect.top) / window.innerHeight, 0),
          1
        );
        setAnimationProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate animated values based on scroll progress
  const studyMindPercentage = Math.min(95 * animationProgress, 95);
  const traditionalPercentage = Math.max(50 - (25 * animationProgress), 25);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary mb-6">
            Scientific Learning
          </div>
          <h2 className="text-4xl font-bold mb-6">Scientifically Proven Learning Methods</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Our app combines spaced repetition, active recall, and visual learning - the three 
            most effective learning techniques backed by decades of research.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-md rounded-2xl p-8 border border-foreground/10 shadow-soft">
            <h3 className="text-2xl font-bold mb-8 text-center">Memorisation after Learning</h3>
            
            {/* Chart */}
            <div className="relative h-64 mb-8">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-muted-foreground">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
              
              {/* Chart area */}
              <div className="ml-12 mr-8 h-full relative">
                {/* Grid lines */}
                <div className="absolute inset-0">
                  {[0, 25, 50, 75, 100].map((percent) => (
                    <div
                      key={percent}
                      className="absolute w-full border-t border-dashed border-muted-foreground/20"
                      style={{ bottom: `${percent}%` }}
                    />
                  ))}
                </div>
                
                {/* StudyMind line (curved upward) */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d={`M 0 ${100 - 75} Q 25 ${100 - 80} 50 ${100 - 90} T 100 ${100 - studyMindPercentage}`}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                
                {/* Traditional line (curved downward) */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d={`M 0 ${100 - 50} Q 25 ${100 - 45} 50 ${100 - 35} T 100 ${100 - traditionalPercentage}`}
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="3"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-12 right-8 flex justify-between text-sm text-muted-foreground mt-4">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">StudyMind</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>
                <span className="text-sm font-medium">Traditional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningMethodsSection;