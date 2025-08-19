import Leaderboards from "@/components/Leaderboards";
import { useSEO } from "@/hooks/useSEO";

const LeaderboardsPage = () => {
  useSEO({
    title: "Fitness Leaderboards | Fitflix Community",
    description: "Join the Fitflix fitness community and compete on our leaderboards. Track your progress, challenge friends, and stay motivated with our fitness tracking system.",
    keywords: "fitness leaderboards, fitness community, progress tracking, fitness challenges, Fitflix community, fitness motivation",
    ogTitle: "Fitness Leaderboards | Fitflix Community",
    ogDescription: "Join the Fitflix fitness community and compete on our leaderboards. Track your progress and stay motivated.",
    canonical: "https://fitflix.in/leaderboards"
  });

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Fitness <span className="text-primary">Leaderboards</span>
        </h1>
        <Leaderboards />
      </div>
    </div>
  );
};

export default LeaderboardsPage;