import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, RefreshCw, MessageCircleHeart, Shield, Brain, Heart } from "lucide-react";

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
            <span>AI-Powered Personal & Relationship Growth</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
            Grow Better,
            <br />
            <span className="text-gradient">Together or Solo</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Whether you're nurturing yourself or your relationship, LoveLite's AI creates 
            personalized daily activities that adapt to your unique journey. Experience 
            meaningful growth through intelligent, science-backed engagement.
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
            <FeaturePill icon={<Brain className="w-4 h-4" />} text="AI-Personalized Tasks" />
            <FeaturePill icon={<RefreshCw className="w-4 h-4" />} text="Adaptive Learning" />
            <FeaturePill icon={<MessageCircleHeart className="w-4 h-4" />} text="Individual or Pair Mode" />
          </div>
        </div>

        {/* Hero illustration - abstract shapes representing connection */}
        <div className="mt-16 flex justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative">
            {/* Two interlinked circles representing partners */}
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/30 flex items-center justify-center bg-card shadow-card">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full gradient-warm opacity-80 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-accent/30 flex items-center justify-center bg-card shadow-card -ml-8">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent/20 flex items-center justify-center">
                  <Brain className="w-10 h-10 text-accent" />
                </div>
              </div>
            </div>
            {/* Connection line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary animate-pulse-soft" />
          </div>
        </div>
      </div>

      {/* Trust indicators */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Privacy First</h3>
                <p className="text-sm text-muted-foreground">Your data is encrypted and never shared with third parties</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Science-Backed</h3>
                <p className="text-sm text-muted-foreground">Activities designed with relationship psychology research</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">AI That Learns</h3>
                <p className="text-sm text-muted-foreground">Recommendations improve based on your feedback</p>
              </div>
            </div>
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
