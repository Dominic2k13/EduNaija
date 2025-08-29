export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  rank: string;
  xp: number;
  coins: number;
  avatar: string;
  totalMatches: number;
  wins: number;
  winRate: number;
}

export type Screen =
  | "login"
  | "signup"
  | "name-input"
  | "dashboard"
  | "game-modes"
  | "question"
  | "match-simulation"
  | "leaderboard"
  | "profile"
  | "rewards";
