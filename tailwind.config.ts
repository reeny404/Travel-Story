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
        tab: "30",
        underbar: "30",
        bottomSheet: "40",
        drawer: "50",
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
        sm: "344px",
        md: "768px",
        lg: "1280px",
      },
      boxShadow: {
        default: "0px 4px 20px 0px rgba(0, 0, 0, 0.08)",
        "bottom-sheet": "0px -4px 20px 0px rgba(0, 0, 0, 0.25)",
        "area-card": "0px 4px 12px 0px rgba(0, 0, 0, 0.12)",
        "bookmark-card": "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
        "inner-bookmark": "inset 0px 0px 8px rgba(0, 0, 0, 0.25)",
        "filter-icon": "0px 4px 30px 0px rgba(0, 0, 0, 0.10)",
        header: "0px 4px 20px 0px rgba(0, 0, 0, 0.04)",
        drawer: "4px 0px 20px 0px rgba(0, 0, 0, 0.16)",
      },
      aspectRatio: {
        "4/5": "4 / 5",
      },
      gridTemplateCols: {
        schedule: "1.75rem 1fr"
      },
      gridTemplateRows: {
        schedule: "1.75rem 1fr",
        "move-schedule": "2.5rem 1fr",
      },
    },
  },
  safelist: [
    {
      pattern: /text-(brand|info|success|danger|neutral)-[0-9]{2,3}/,
    },
    {
      pattern: /bg-(brand|info|success|danger|neutral)-[0-9]{2,3}/,
    },
    {
      pattern: /border-(brand|info|success|danger|neutral)-[0-9]{2,3}/,
    },
  ],
};

export default config;
