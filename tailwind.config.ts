import type { Config } from "tailwindcss";
import { COLOR } from "./src/constants/color";
import { colors } from "./styles/theme/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        ...COLOR,
        "neutral-400/84": "rgba(255, 255, 255, 0.84)",
      },
      zIndex: {
        modal: "40",
        drawer: "1000",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-white":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.31) 34%, #FFF 100%)",
        "gradient-areaCard":
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00)0%, rgba(0, 0, 0, 0.80)100%)",
      },
      screens: {
        sm: "431px",
        md: "768px",
        lg: "1280px",
      },
      boxShadow: {
        default: "0px 4px 20px 0px rgba(0, 0, 0, 0.08)",
        "bottom-sheet": "0px -4px 20px 0px rgba(0, 0, 0, 0.25)",
        "schecule-list": "0px 4px 20px 0px #00000014",
        "area-card": "0px 4px 12px 0px rgba(0, 0, 0, 0.12)",
        "area-section": "0px 4px 20px 0px rgba(0, 0, 0, 0.08)",
        "bookmark-card": "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
        "inner-bookmark": "inset 0px 0px 8px rgba(0, 0, 0, 0.25)",
        "filter-icon": "0px 4px 30px 0px rgba(0, 0, 0, 0.10)",
        search: "0px 4px 20px 0px rgba(0, 0, 0, 0.08)",
        plan: "0px 4px 20px 0px rgba(0, 0, 0, 0.08)",
        header: "0px 4px 20px 0px rgba(0, 0, 0, 0.04)",
        drawer: "4px 0px 20px 0px rgba(0, 0, 0, 0.16)",
      },
      aspectRatio: {
        "4/5": "4 / 5",
      },
    },
  },
};

export default config;
