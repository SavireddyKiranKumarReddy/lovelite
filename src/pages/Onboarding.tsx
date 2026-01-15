import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Logo from "@/components/Logo";
import { ArrowRight, ArrowLeft, Heart, Sparkles } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: "love-language",
    question: "What makes you feel most loved?",
    options: [
      "Words of affirmation",
      "Quality time together",
      "Receiving thoughtful gifts",
      "Acts of service",
      "Physical touch",
    ],
  },
  {
    id: "communication-style",
    question: "How do you prefer to communicate?",
    options: [
      "Deep, meaningful conversations",
      "Quick check-ins throughout the day",
      "Quality face-to-face time",
      "Written notes or messages",
    ],
  },
  {
    id: "activity-preference",
    question: "What kind of activities energize you?",
    options: [
      "Outdoor adventures",
      "Creative projects together",
      "Cozy nights at home",
      "Social gatherings",
      "Learning something new",
    ],
  },
  {
    id: "conflict-style",
    question: "How do you handle disagreements?",
    options: [
      "I prefer to talk it out immediately",
      "I need time to process first",
      "I like to write down my thoughts",
      "I prefer to focus on solutions",
    ],
  },
  {
    id: "growth-goals",
    question: "What would you like to improve in your relationship?",
    options: [
      "Communication and understanding",
      "Quality time together",
      "Emotional intimacy",
      "Shared goals and planning",
      "Fun and spontaneity",
    ],
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      console.log("Onboarding complete:", answers);
      navigate("/connect-partner");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isAnswered = answers[currentQuestion.id];

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo showText={false} />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Getting to know you</span>
            <span>{currentStep + 1} of {questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-3xl shadow-soft border border-border/50 p-8">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Question {currentStep + 1}</span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  answers[currentQuestion.id] === option
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border/50 hover:border-primary/30 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      answers[currentQuestion.id] === option
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {answers[currentQuestion.id] === option && (
                      <Heart className="w-3 h-3 text-primary-foreground fill-current" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!isAnswered}
              className="gap-2"
            >
              {currentStep === questions.length - 1 ? "Complete" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
