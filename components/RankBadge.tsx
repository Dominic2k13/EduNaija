import React from "react";
import { Crown, Star, Diamond, Award, Trophy, Zap } from "lucide-react";

interface RankBadgeProps {
  rank: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const RankBadge: React.FC<RankBadgeProps> = ({
  rank,
  size = "md",
  showText = true,
}) => {
  const getRankConfig = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "bronze":
        return {
          color: "from-orange-600 to-yellow-700",
          icon: Award,
          textColor: "text-orange-300",
        };
      case "silver":
        return {
          color: "from-gray-400 to-gray-600",
          icon: Star,
          textColor: "text-gray-300",
        };
      case "gold":
        return {
          color: "from-yellow-400 to-yellow-600",
          icon: Trophy,
          textColor: "text-yellow-300",
        };
      case "platinum":
        return {
          color: "from-cyan-400 to-blue-600",
          icon: Diamond,
          textColor: "text-cyan-300",
        };
      case "diamond":
        return {
          color: "from-blue-400 to-purple-600",
          icon: Diamond,
          textColor: "text-blue-300",
        };
      case "master":
        return {
          color: "from-purple-500 to-pink-600",
          icon: Crown,
          textColor: "text-purple-300",
        };
      case "grandmaster":
        return {
          color: "from-red-500 to-pink-600",
          icon: Crown,
          textColor: "text-red-300",
        };
      case "legend":
        return {
          color: "from-yellow-400 to-red-600",
          icon: Zap,
          textColor: "text-yellow-300",
        };
      default:
        return {
          color: "from-gray-500 to-gray-700",
          icon: Award,
          textColor: "text-gray-300",
        };
    }
  };

  const config = getRankConfig(rank);
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: { badge: "w-8 h-8", icon: "w-4 h-4", text: "text-sm" },
    md: { badge: "w-12 h-12", icon: "w-6 h-6", text: "text-base" },
    lg: { badge: "w-16 h-16", icon: "w-8 h-8", text: "text-lg" },
  };

  const classes = sizeClasses[size];

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`${classes.badge} bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center shadow-lg`}
      >
        <IconComponent className={`${classes.icon} text-white`} />
      </div>
      {showText && (
        <span className={`font-bold ${config.textColor} ${classes.text}`}>
          {rank}
        </span>
      )}
    </div>
  );
};

export default RankBadge;
