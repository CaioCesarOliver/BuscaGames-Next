import LaunchCountdownCube from '../../components/LaunchCountdown'
import GamesSection from '../../components/GamesSectionHome'
import { DailyQuests, Newsletter } from '../../components/DailyQuests'

const Homepage = () => {
    return (
        <div>
            <div className="pt-16"></div>
            <LaunchCountdownCube />
            <GamesSection />
            <DailyQuests />
            <Newsletter />
        </div>
    )
}

export default Homepage
