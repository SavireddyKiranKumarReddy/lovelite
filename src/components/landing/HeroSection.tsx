import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles, RefreshCw, MessageCircleHeart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Relationship Growth</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
            Nurture Your Love,
            <br />
            <span className="text-gradient">One Day at a Time</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Discover personalized daily activities that adapt to your relationship. 
            Stay emotionally connected with your partner through intelligent, 
            meaningful engagement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/login">
                Welcome Back
              </Link>
            </Button>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <FeaturePill icon={<Heart className="w-4 h-4" />} text="Personalized Tasks" />
            <FeaturePill icon={<RefreshCw className="w-4 h-4" />} text="Adaptive Learning" />
            <FeaturePill icon={<MessageCircleHeart className="w-4 h-4" />} text="Partner Sync" />
          </div>
        </div>

        {/* Hero illustration - abstract shapes representing connection */}
        <div className="mt-16 flex justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative">
            {/* Two interlinked circles representing partners */}
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/30 flex items-center justify-center bg-card shadow-card">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full gradient-warm opacity-80" />
              </div>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-accent/30 flex items-center justify-center bg-card shadow-card -ml-8">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent/20" />
              </div>
            </div>
            {/* Connection line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary animate-pulse-soft" />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturePill = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-card border border-border/50">
    <span className="text-primary">{icon}</span>
    <span className="text-sm font-medium text-foreground">{text}</span>
  </div>
);

export default HeroSection;
