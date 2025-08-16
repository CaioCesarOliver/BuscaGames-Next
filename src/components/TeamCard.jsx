"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { motion } from "framer-motion";

const iconMap = {
    linkedin: faLinkedin,
    github: faGithub,
    instagram: faInstagram
}

export default function TeamCard({ imageSrc, name, role, position, rm, socialLinks = [] }) {
    return (
        <motion.article
            className="bg-white dark:bg-gray-900 rounded-xl border border-purple-300 dark:border-purple-700 shadow-md overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="overflow-hidden">
                <motion.img
                    src={imageSrc}
                    alt={name}
                    className="w-full h-auto object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy"
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
                        const faIcon = iconMap[icon.toLowerCase()];
                        if (!faIcon) return null;

                        return (
                            <motion.a
                                key={i}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${icon} link`}
                                className="text-indigo-600 dark:text-indigo-400 transition-colors text-xl"
                                whileHover={{ y: -3, scale: 1.5, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                <FontAwesomeIcon icon={faIcon} />
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </motion.article>
    )
}
