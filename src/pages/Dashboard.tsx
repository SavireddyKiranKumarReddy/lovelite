import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { 
  Heart, 
  Calendar, 
  MessageSquareHeart, 
  User, 
  LogOut,
  Sparkles,
  CheckCircle2,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Meh
} from "lucide-react";

// Mock data - in production this comes from backend
const todayTask = {
  id: "1",
  title: "Share Three Gratitudes",
  description: "Take 10 minutes today to share three things you're grateful for about your partner. Be specific and heartfelt.",
  category: "Communication",
  estimatedTime: "10 min",
  completed: false,
};

const Dashboard = () => {
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  const handleCompleteTask = () => {
    setTaskCompleted(true);
  };

  const handleFeedback = (feedback: string) => {
    setSelectedFeedback(feedback);
    setFeedbackGiven(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border/50 p-6 hidden md:flex flex-col">
        <Logo className="mb-8" />
        
        <nav className="space-y-2 flex-1">
          <NavItem icon={<Sparkles />} label="Today's Task" active />
          <NavItem icon={<Calendar />} label="Task History" />
          <NavItem icon={<MessageSquareHeart />} label="Check-ins" />
          <NavItem icon={<User />} label="Profile" />
        </nav>

        <div className="pt-4 border-t border-border/50">
          <button className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors w-full py-2">
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-card/50 backdrop-blur-lg border-b border-border/50 p-6 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Welcome back,</p>
                <h1 className="font-serif text-2xl font-bold text-foreground">Sarah & Mike</h1>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">7 day streak!</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            {/* Today's Task Card */}
            <div className="bg-card rounded-3xl shadow-soft border border-border/50 overflow-hidden">
              {/* Task Header */}
              <div className="gradient-warm p-6">
                <div className="flex items-center gap-2 text-primary-foreground/80 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Today's Activity</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-primary-foreground">
                  {todayTask.title}
                </h2>
              </div>

              {/* Task Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {todayTask.category}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {todayTask.estimatedTime}
                  </span>
                </div>

                <p className="text-foreground leading-relaxed mb-8">
                  {todayTask.description}
                </p>

                {!taskCompleted ? (
                  <Button variant="hero" size="lg" className="w-full" onClick={handleCompleteTask}>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Mark as Completed
                  </Button>
                ) : !feedbackGiven ? (
                  <div className="space-y-4">
                    <p className="text-center text-sm text-muted-foreground">
                      How did this activity make you feel?
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <FeedbackButton
                        icon={<ThumbsDown className="w-6 h-6" />}
                        label="Not great"
                        onClick={() => handleFeedback("negative")}
                        selected={selectedFeedback === "negative"}
                      />
                      <FeedbackButton
                        icon={<Meh className="w-6 h-6" />}
                        label="Okay"
                        onClick={() => handleFeedback("neutral")}
                        selected={selectedFeedback === "neutral"}
                      />
                      <FeedbackButton
                        icon={<ThumbsUp className="w-6 h-6" />}
                        label="Loved it!"
                        onClick={() => handleFeedback("positive")}
                        selected={selectedFeedback === "positive"}
                        primary
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-medium">Thanks for your feedback!</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      We'll use this to personalize tomorrow's activity
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Partner Status */}
            <div className="mt-6 bg-card rounded-2xl shadow-card border border-border/50 p-6">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Partner Status</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center text-primary-foreground font-semibold">
                  M
                </div>
                <div>
                  <p className="font-medium text-foreground">Mike</p>
                  <p className="text-sm text-muted-foreground">Hasn't completed today's task yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <button
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      active
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`}
  >
    <span className="w-5 h-5">{icon}</span>
    {label}
  </button>
);

const FeedbackButton = ({
  icon,
  label,
  onClick,
  selected,
  primary = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  selected: boolean;
  primary?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
      selected
        ? primary
          ? "border-primary bg-primary/10 text-primary"
          : "border-foreground/20 bg-muted text-foreground"
        : "border-border/50 hover:border-primary/30 text-muted-foreground hover:text-foreground"
    }`}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </button>
);

export default Dashboard;
