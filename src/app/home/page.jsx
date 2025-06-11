import LaunchCountdownCube from '../../components/LaunchCountdown'
import GamesSection from '../../components/GamesSectionHome'
import { DailyQuests, Newsletter } from '../../components/DailyQuests'

const Homepage = () => {
    return (
        <div>
            <div className="overflow-x-hidden pt-16">
                <LaunchCountdownCube />
                <GamesSection />
                <DailyQuests />
                <Newsletter />
            </div>

        </div>
    )
}

export default Homepage
