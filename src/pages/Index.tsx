import PDFHeader from "@/components/PDFHeader";
import PDFHero from "@/components/PDFHero";
import HowItWorksSection from "@/components/HowItWorksSection";
import LearningMethodsSection from "@/components/LearningMethodsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PDFHeader />
      <PDFHero />
      <HowItWorksSection />
      <LearningMethodsSection />
    </div>
  );
};

export default Index;
