import { CheckCircle, Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  rating: number;
  verified?: boolean;
}

const TestimonialCard = ({ name, role, quote, rating, verified = true }: TestimonialCardProps) => {
  return (
    <div className="card-tool animate-fade-in">
      <div className="flex items-start gap-4">
        {/* Verified Badge */}
        {verified && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full shrink-0">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-foreground">Verified</span>
          </div>
        )}
        
        {/* Quote */}
        <div className="flex-1">
          <p className="text-foreground font-medium mb-2">"{quote}"</p>
          <p className="text-muted-foreground text-sm">- {name}, {role}</p>
        </div>
        
        {/* Rating */}
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold text-foreground">{rating}/5.0</div>
          <div className="flex gap-0.5 justify-end mt-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-accent fill-accent' : 'text-muted-foreground'}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
