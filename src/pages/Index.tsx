import StudyPDFHeader from "@/components/StudyPDFHeader";
import StudyPDFHero from "@/components/StudyPDFHero";
import HowItWorksSection from "@/components/HowItWorksSection";
import LearningMethodsSection from "@/components/LearningMethodsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StudyPDFHeader />
      <StudyPDFHero />
      <HowItWorksSection />
      <LearningMethodsSection />
    </div>
  );
};

export default Index;
