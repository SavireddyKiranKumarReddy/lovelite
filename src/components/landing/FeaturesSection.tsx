import { Sparkles, Users, MessageSquareHeart, TrendingUp, User, Zap, Target, Heart } from "lucide-react";

const features = [
  {
    icon: User,
    title: "Individual Mode",
    description: "Personal growth journey with AI-tailored daily activities based on your unique profile and goals.",
  },
  {
    icon: Users,
    title: "Pair Mode",
    description: "Connect with your partner using a unique code. Share experiences and grow together in sync.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Tasks",
    description: "Receive personalized activities crafted by AI that adapt to your feedback and progress.",
  },
  {
    icon: MessageSquareHeart,
    title: "Smart Feedback",
    description: "Share how activities made you feel. Your feedback shapes smarter recommendations.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Sign Up & Choose Mode",
    description: "Create your account and select Individual or Pair mode based on your journey.",
    icon: Target,
  },
  {
    step: "02",
    title: "Answer AI Questions",
    description: "Our AI asks personalized questions to understand you deeply and tailor your experience.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Receive Daily Tasks",
    description: "Get unique, meaningful activities designed specifically for you each day.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Grow & Evolve",
    description: "Complete tasks, share feedback, and watch your journey adapt and improve over time.",
    icon: Heart,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            How LoveLite Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A personalized approach to growth, powered by AI that truly understands you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-background border border-border/50 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center mb-4 shadow-warm group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Journey, Step by Step
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simple, meaningful, and designed around you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((item, index) => (
            <div key={item.step} className="relative">
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -translate-x-1/2" />
              )}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-warm text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <item.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
