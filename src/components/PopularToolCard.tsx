import { LucideIcon } from "lucide-react";
import ToolCard from "./ToolCard";

interface PopularToolCardProps {
  title: string;
  icon: LucideIcon;
  to: string;
  description?: string;
  category?: string;
  badge?: string;
}

/** Kept for existing imports; renders the shared ToolCard. */
const PopularToolCard = (props: PopularToolCardProps) => <ToolCard {...props} />;

export default PopularToolCard;
