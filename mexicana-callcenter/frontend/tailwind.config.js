/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        primary: "#20253f",
        slategray: "#545973",
        tertiary: "#f8f9fa",
        'customGreen':"rgba(24,124,67,1)",
        secondary: "#4A8B51",
        marco: "rgba(32, 37, 63, 0.5)",
        black: "#000",
      },
      spacing: {},
      fontFamily: {
        paragraph: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        "paragraph2": ['Roboto'],
      },
      borderRadius: {
        "3xs": "10px",
        'xl': '1rem',
      },
    },
    fontSize: {
      //lg: "18px",
      //"41xl": "60px",
      inherit: "inherit",
      //"3xl": "30px",
      subtitle: "40px",
      "p2":"30px",
      xs: "12px",
      sm: "14px",
      base: "1p6x",
      lg: "18px",
      xl: "20px",
      '2xl': "24px",
      '3xl': "30px",
      '4xl': "36px",
      '5xl': "48px",
      '6xl': "64px",
    },
    fontWeight: {
      subtitle: 100,
      "p2": 300,
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
    lineHeight: {
      subtitle: "60px",
      "p2": "35px",
    },
    screens: {
      // lg: {
      //   max: "1200px",
      // },
      // mq1050: {
      //   raw: "screen and (max-width: 1050px)",
      // },
      // mq750: {
      //   raw: "screen and (max-width: 750px)",
      // },
      // mq450: {
      //   raw: "screen and (max-width: 450px)",
      // },
      '2sm': '320px',
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
      },
  },
  corePlugins: {
    preflight: true,
  },
};