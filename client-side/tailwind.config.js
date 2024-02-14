/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // fontFamily: {
    //   inter: ["Inter", "sans-serif"],
    //   "edu-sa": ["Edu SA Beginner", "cursive"],
    //   mono: ["Roboto Mono", "monospace"],
    // },
    // colors: {
    //   white: "#fff",
    //   black: "#000",
    //   transparent: "#ffffff00",
    //   richblack: {
    //     5: "#F1F2FF",
    //     10: "#1C1C24",
    //     15: "#2C2F32",
    //     20: "#13131A",
    //     25: "#DBDDEA",
    //     30: "#808080",
    //     50: "#C5C7D4",
    //     100: "#AFB2BF",
    //     200: "#999DAA",
    //     300: "#838894",
    //     400: "#6E727F",
    //     500: "#585D69",
    //     600: "#424854",
    //     700: "#2C333F",
    //     800: "#161D29",
    //     900: "#000814",
    //   },
    //   richblue: {
    //     5: "#ECF5FF",
    //     25: "#C6D6E1",
    //     50: "#A0B7C3",
    //     100: "#7A98A6",
    //     200: "#537988",
    //     300: "#2D5A6A",
    //     400: "#073B4C",
    //     500: "#063544",
    //     600: "#042E3B",
    //     700: "#032833",
    //     800: "#01212A",
    //     900: "#001B22",
    //   },
    //   blue: {
    //     5: "#EAF5FF",
    //     25: "#B4DAEC",
    //     50: "#7EC0D9",
    //     100: "#47A5C5",
    //     200: "#118AB2",
    //     300: "#0F7A9D",
    //     400: "#0C6A87",
    //     500: "#0A5A72",
    //     600: "#074B5D",
    //     700: "#053B48",
    //     800: "#022B32",
    //     900: "#001B1D",
    //   },
    //   caribbeangreen: {
    //     5: "#C1FFFD",
    //     25: "#83F1DE",
    //     50: "#44E4BF",
    //     100: "#06D6A0",
    //     200: "#05BF8E",
    //     300: "#05A77B",
    //     400: "#049069",
    //     500: "#037957",
    //     600: "#026144",
    //     700: "#014A32",
    //     800: "#01321F",
    //     900: "#001B0D",
    //   },
    //   brown: {
    //     5: "#FFF4C4",
    //     25: "#FFE395",
    //     50: "#FFD166",
    //     100: "#E7BC5B",
    //     200: "#CFA64F",
    //     300: "#B89144",
    //     400: "#A07C39",
    //     500: "#88662D",
    //     600: "#705122",
    //     700: "#593C17",
    //     800: "#41260B",
    //     900: "#291100",
    //   },
    //   pink: {
    //     5: "#FFF1F1",
    //     25: "#FBC7D1",
    //     50: "#F79CB0",
    //     100: "#F37290",
    //     200: "#EF476F",
    //     300: "#D43D63",
    //     400: "#BA3356",
    //     500: "#9F294A",
    //     600: "#841E3E",
    //     700: "#691432",
    //     800: "#4F0A25",
    //     900: "#340019",
    //   },
    //   yellow: {
    //     5: "#FFF970",
    //     25: "#FFE83D",
    //     50: "#FFD60A",
    //     100: "#E7C009",
    //     200: "#CFAB08",
    //     300: "#B69507",
    //     400: "#9E8006",
    //     500: "#866A04",
    //     600: "#6E5503",
    //     700: "#553F02",
    //     800: "#3D2A01",
    //     900: "#251400",
    //   },
    //   "pure-greys": {
    //     5: "#F9F9F9",
    //     25: "#E2E2E2",
    //     50: "#CCCCCC",
    //     100: "#B5B5B5",
    //     200: "#9E9E9E",
    //     300: "#888888",
    //     400: "#717171",
    //     500: "#5B5B5B",
    //     600: "#444444",
    //     700: "#2D2D2D",
    //     800: "#171717",
    //     900: "#141414",
    //   },
    //   "orange": {
    //     5: "#E95420",
    //     10: "#EB6536",
    //     50: "#F4AA90",
    //     800: "#ED764D",
    //   },
    // },
    // extend: {
    //   maxWidth: {
    //     maxContent: "1260px",
    //     maxContentTab: "650px"
    //   }
    // },
    extend: {
      transitionProperty: {
        "max-height": "max-height",
        height: "height",
      },
      
      boxShadow: {
        header:
          "0 0.46875rem 2.1875rem rgb(59 62 102 / 3%), 0 0.9375rem 1.40625rem rgb(59 62 102 / 3%), 0 0.25rem 0.53125rem rgb(59 62 102 / 5%), 0 0.125rem 0.1875rem rgb(59 62 102 / 3%)",
        "card-box": "0 1px 15px 1px rgb(62 57 107 / 7%)",
        button: "0 14px 24px 0 rgb(62 57 107 / 26%)",
        "button-alt":
          "0 14px 26px -12px rgb(0 0 0 / 10%), 0 4px 23px 0 rgb(0 0 0 / 10%), 0 8px 10px -5px rgb(0 0 0 / 10%)",
        section:
          "0 0.46875rem 2.1875rem rgb(59 62 102 / 3%), 0 0.9375rem 1.40625rem rgb(59 62 102 / 3%), 0 0.25rem 0.53125rem rgb(59 62 102 / 5%), 0 0.125rem 0.1875rem rgb(59 62 102 / 3%)",
        drawer:
          "0 3px 5px -1px rgb(0 0 0 / 20%), 0 5px 8px 0 rgb(0 0 0 / 14%), 0 1px 14px 0 rgb(0 0 0 / 12%)",
        card: "0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%)",

        box: "rgba(0, 0, 0, 0.2) 0 8px 10px -5px, rgba(0, 0, 0, 0.14) 0 16px 24px 2px, rgba(0, 0, 0, 0.12) 0 6px 30px 5px",

        dialog:
          "0 3px 5px -1px rgb(0 0 0 / 10%), 0 6px 10px 0 rgb(0 0 0 / 10%), 0 1px 18px 0 rgb(0 0 0 / 12%)",
        "play-button":
          "rgba(0 0 0 0.2) 0 3px 5px -1px, rgba(0 0 0 0.14) 0 6px 10px 0, rgba(0 0 0 0.12) 0 1px 18px 0",
      },

      colors: {
        onNeutralBg: "var(--onNeutralBg)",
        neutralBg: "var(--neutralBg)",
        neutralBgOpacity: "var(--neutralBgOpacity)",
        neutralBgAlt: "var(--neutralBgAlt)",

        primary: "var(--primary)",
        "primary-opacity": "var(--primary-opacity)",
        "primary-light-gray": "var(--primary-light-gray)",
        secondary: "var(--onNeutralBgSecondary)",
        divider: "var(--onNeutralBgDivider)",

        sidebar: "var(--neutralBgAlt)",
        main: "var(--neutralBg)",
        switch: "var(--switchBg)",

        card: "var(--cardBg)",
        "card-skeleton": "var(--cardSkeletonBg)",
        "card-hover": "var(--cardBgHover)",
        player: "var(--playerBg)",

        glassmorphism: "rgba(0, 0, 0, 0.50)",
      },

      width: {
        sidebar: "var(--sidebar-width)",
        aside: "var(--aside-width)",
        logo: "var(--logo-width)",
      },

      height: {
        navbar: "var(--nav-height)",
        player: "var(--player-height)",
      },

      minWidth: {
        sidebar: "var(--sidebar-width)",
        aside: "var(--aside-width)",
      },

      spacing: {
        sidebar: "var(--sidebar-width)",
        aside: "var(--aside-width)",
        navbar: "var(--nav-height)",
        "main-top": "var(--main-margin-top)",
        logo: "var(--logo-width)",
        player: "var(--player-height)",
        sidebarHorizontal: "var(--sidebar-horizontal-width)",
      },

      screens: {
        xs: "450px",
      },

      borderRadius: {
        DEFAULT: "var(--border-radius)",
      },
    },
  },
  plugins: [],
};