import { Sparkles, Users, MessageSquareHeart, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Partner Connection",
    description: "Easily link with your partner using a unique code. Share experiences and grow together.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Tasks",
    description: "Receive personalized daily activities crafted by AI based on your unique relationship dynamics.",
  },
  {
    icon: MessageSquareHeart,
    title: "Feedback & Growth",
    description: "Share how activities made you feel. Your feedback shapes future recommendations.",
  },
  {
    icon: TrendingUp,
    title: "Adaptive Learning",
    description: "The more you engage, the smarter it gets. Tasks evolve with your relationship.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Kindred Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A simple yet powerful approach to strengthening your bond
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
};

export default FeaturesSection;
