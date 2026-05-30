import {

    Sun,
    Moon

} from "lucide-react";

function ThemeToggle({

    darkMode,
    setDarkMode

}) {

    return (

        <button

            onClick={() =>
                setDarkMode(!darkMode)
            }

            className={`

                flex items-center
                justify-center

                w-14 h-14

                rounded-full

                transition-all
                duration-300

                shadow-lg

                hover:scale-110

                ${darkMode

                    ? "bg-[#1E293B] text-white hover:bg-[#334155]"

                    : "bg-white text-yellow-500 hover:bg-yellow-100"

                }

            `}

            title={
                darkMode
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
            }

        >

            {darkMode ? (

                <Moon
                    size={24}
                />

            ) : (

                <Sun
                    size={24}
                />

            )}

        </button>

    );

}

export default ThemeToggle;