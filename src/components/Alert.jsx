"use client";

import { useEffect } from "react";
import { FaInfoCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Alert({ message, type = "info", onClose }) {
  const icons = {
    info: <FaInfoCircle className="w-6 h-6 text-blue-500" />,
    success: <FaCheckCircle className="w-6 h-6 text-green-500" />,
    error: <FaTimesCircle className="w-6 h-6 text-red-500" />,
  };

  const borderColors = {
    info: "border-blue-500",
    success: "border-green-500",
    error: "border-red-500",
  };

  const bgColors = {
    info: "bg-gray-100 dark:bg-slate-950",
    success: "bg-green-100 dark:bg-green-900",
    error: "bg-red-100 dark:bg-red-900",
  };

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="alert"
      className={`fixed top-36 right-5 flex items-center gap-3 px-4 py-3 rounded shadow-md max-w-md mx-auto
                  border-l-4 ${borderColors[type] || borderColors.info}
                  ${bgColors[type] || bgColors.info}
                  text-gray-900 dark:text-gray-100 z-[9999]`}
    >
      <div>{icons[type] || icons.info}</div>
      <p className="flex-1">{message}</p>
    </div>
  );
}
