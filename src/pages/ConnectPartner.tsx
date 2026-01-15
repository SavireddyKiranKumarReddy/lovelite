import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { Copy, Check, ArrowRight, Link2, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ConnectPartner = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"invite" | "join">("invite");
  const [partnerCode, setPartnerCode] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Mock unique code - in production this would come from the backend
  const myCode = "LOVE-ABC123";
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(myCode);
    setCopied(true);
    toast({
      title: "Code copied!",
      description: "Share this code with your partner",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinPartner = () => {
    if (partnerCode.trim()) {
      // TODO: Implement partner connection with backend
      console.log("Joining partner with code:", partnerCode);
      toast({
        title: "Connection request sent!",
        description: "Waiting for your partner to accept",
      });
      navigate("/dashboard");
    }
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl shadow-soft border border-border/50 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-warm flex items-center justify-center shadow-warm">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
              Connect With Your Partner
            </h1>
            <p className="text-muted-foreground text-sm">
              Invite your partner or enter their code to begin your journey together
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-muted rounded-xl">
            <button
              onClick={() => setActiveTab("invite")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "invite"
                  ? "bg-card shadow-card text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Invite Partner
            </button>
            <button
              onClick={() => setActiveTab("join")}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "join"
                  ? "bg-card shadow-card text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Enter Code
            </button>
          </div>

          {activeTab === "invite" ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Share this unique code with your partner
              </p>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 h-14 rounded-xl bg-muted border border-border/50 flex items-center justify-center">
                  <span className="font-mono text-lg font-bold text-foreground tracking-wider">
                    {myCode}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-xl"
                  onClick={handleCopyCode}
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-accent" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-3 py-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or share via</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <Button variant="soft" className="w-full gap-2" onClick={handleCopyCode}>
                <Link2 className="w-4 h-4" />
                Copy Invite Link
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Enter the code your partner shared with you
              </p>
              
              <Input
                type="text"
                placeholder="Enter partner's code (e.g., LOVE-ABC123)"
                value={partnerCode}
                onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                className="h-14 rounded-xl text-center font-mono text-lg tracking-wider"
              />

              <Button
                variant="hero"
                className="w-full"
                onClick={handleJoinPartner}
                disabled={!partnerCode.trim()}
              >
                Connect
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-border/50 text-center">
            <button
              onClick={handleSkip}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPartner;
