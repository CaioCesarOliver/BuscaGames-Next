// utils/swalWithTheme.js
import Swal from "sweetalert2";

export const swalWithTheme = ({ icon, title, text, timer = null }) => {
    const isDark = document.documentElement.classList.contains("dark");

    return Swal.fire({
        icon,
        title,
        text,
        background: isDark ? "#020617" : "#fff",
        color: isDark ? "#fff" : "#111",         
        confirmButtonColor:
            icon === "success"
                ? isDark
                    ? "#16a34a"
                    : "#059669"
                : icon === "error"
                    ? isDark
                        ? "#dc2626"
                        : "#b91c1c"
                    : icon === "warning"
                        ? isDark
                            ? "#facc15"
                            : "#ca8a04"
                        : isDark
                            ? "#6366f1"
                            : "#4f46e5", 
        confirmButtonText: "OK",
        timer,
        timerProgressBar: !!timer,
    });
};
