import LaunchCountdown from './_components/LaunchCountdown';
import GamesSectionHome from './_components/GamesSectionHome';
import { DailyQuests, Newsletter } from './_components/DailyQuests';

const Homepage = () => {
  return (
    <div>
      <div className="overflow-x-hidden pt-16">
        <LaunchCountdown />
        <GamesSectionHome />
        <DailyQuests />
        <Newsletter />
      </div>
    </div>
  );
};

export default Homepage;