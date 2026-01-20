interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 rounded-full gradient-warm flex items-center justify-center shadow-warm">
          <span className="text-primary-foreground font-serif font-bold text-lg">LL</span>
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent animate-pulse-soft" />
      </div>
      {showText && (
        <span className="font-serif text-xl font-semibold text-foreground">
          LoveLite
        </span>
      )}
    </div>
  );
};

export default Logo;
