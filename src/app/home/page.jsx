"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import LaunchCountdownCube from '../../components/LaunchCountdown';
import GamesSection from '../../components/GamesSectionHome';
import { DailyQuests, Newsletter } from '../../components/DailyQuests';

const Homepage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Sessão carregada:", session);
  }, [session]);

  return (
    <div>
      <div className="overflow-x-hidden pt-16">
        <LaunchCountdownCube />
        <GamesSection />
        <DailyQuests />
        <Newsletter />
      </div>
    </div>
  );
};

export default Homepage;