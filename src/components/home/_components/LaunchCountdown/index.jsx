"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LaunchCountdown() {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    launched: false,
  });

  useEffect(() => {
    const releaseDate = new Date("2026-05-26T00:00:00");

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = releaseDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCountdown((prev) => ({ ...prev, launched: true }));
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        launched: false,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Variants para cada cubo do countdown
  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 120 },
    }),
  };

  // Variant para o botão
  const buttonVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15 * 4 + 0.3 } },
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-52 -mt-[90px] text-white"
      style={{ backgroundImage: "url('/gta6-banner.png')" }}
    >
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Prepare-se para o lançamento!
        </motion.h2>

        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Contagem regressiva para GTA VI
        </motion.p>

        {countdown.launched ? (
          <motion.div
            className="text-3xl font-bold text-green-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            LANÇADO!
          </motion.div>
        ) : (
          <>
            <div className="flex justify-center gap-6 text-2xl font-mono">
              {[
                { label: "dias", value: countdown.days },
                { label: "horas", value: countdown.hours },
                { label: "minutos", value: countdown.minutes },
                { label: "segundos", value: countdown.seconds },
              ].map(({ label, value }, index) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-center bg-gray-950 rounded-lg px-6 py-4 shadow-md border-2 border-blue-400"
                  custom={index}
                  variants={blockVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <span className="text-4xl font-bold tabular-nums">{value}</span>
                  <span className="text-sm text-gray-400 mt-1">{label}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="mt-6 bg-pink-600 hover:bg-pink-700 transition px-6 py-2 rounded font-semibold"
              variants={buttonVariant}
              initial="hidden"
              animate="visible"
            >
              Saiba mais
            </motion.button>
          </>
        )}
      </div>
    </section>
  );
}
