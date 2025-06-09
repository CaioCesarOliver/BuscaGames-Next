import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLinkedin,
    faGithub,
    faInstagram
} from '@fortawesome/free-brands-svg-icons'

const iconMap = {
    linkedin: faLinkedin,
    github: faGithub,
    instagram: faInstagram
}

export default function TeamCard({ imageSrc, name, role, position, rm, socialLinks = [] }) {
    return (
        <article className="bg-white dark:bg-gray-900 rounded-xl border border-purple-300 dark:border-purple-700 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
            <div className="overflow-hidden">
                <img
                    src={imageSrc}
                    alt={name}
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6 text-center flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
                <span className="inline-block mt-1 px-3 py-1 bg-purple-600 dark:bg-purple-700 text-white rounded-full text-sm font-medium">
                    {role}
                </span>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{position}</p>
                <p className="mt-1 mb-4 text-indigo-600 dark:text-indigo-400 font-semibold">{rm}</p>
                <div className="mt-auto flex justify-center space-x-4">
                    {socialLinks.map(({ icon, url }, i) => {
                        const faIcon = iconMap[icon.toLowerCase()]
                        if (!faIcon) return null
                        return (
                            <a
                                key={i}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${icon} link`}
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors text-xl"
                            >
                                <FontAwesomeIcon icon={faIcon} />
                            </a>
                        )
                    })}
                </div>
            </div>
        </article>
    )
}
