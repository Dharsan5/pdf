import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Users, FileText, Star } from "lucide-react";

const StudyPDFHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* Spacer for fixed header */}
      <div className="h-16" />
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-foreground/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">DigFile</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Features Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => toggleDropdown('features')}
              >
                Features
                <ChevronDown className="h-4 w-4 transition-transform" />
              </button>
              {openDropdown === 'features' && (
                <div className="absolute top-full left-0 w-48 mt-1 bg-card rounded-lg shadow-soft border border-border overflow-hidden">
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">AI Exams</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">Mind Maps</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">AI Flashcards</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">Chat Tutor</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">AI Summary</a>
                </div>
              )}
            </div>
            
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Courses</a>
            
            {/* Support Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => toggleDropdown('support')}
              >
                Support
                <ChevronDown className="h-4 w-4 transition-transform" />
              </button>
              {openDropdown === 'support' && (
                <div className="absolute top-full left-0 w-48 mt-1 bg-card rounded-lg shadow-soft border border-border overflow-hidden">
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">Contact Us</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">FAQ Section</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">Help Center</a>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="gradient" size="sm">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-4 space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Features</div>
                <a href="#" className="block py-2 text-sm">AI Exams</a>
                <a href="#" className="block py-2 text-sm">Mind Maps</a>
                <a href="#" className="block py-2 text-sm">AI Flashcards</a>
                <a href="#" className="block py-2 text-sm">Chat Tutor</a>
              </div>
              <a href="#" className="block py-2 text-sm font-medium">Pricing</a>
              <a href="#" className="block py-2 text-sm font-medium">Courses</a>
              <a href="#" className="block py-2 text-sm font-medium">Support</a>
              
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" size="sm">Sign In</Button>
                <Button variant="gradient" size="sm">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default StudyPDFHeader;