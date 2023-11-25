import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      // 800: "#242424",
      900: "#111",
    },
  },
  breakpoints: {
    sm: "30em", // Small screens (480px and up)
    md: "47em", // Medium screens (768px and up) - 1em
    lg: "62em", // Large screens (992px and up)
    xl: "80em", // Extra-large screens (1200px and up)
    "2xl": "85em", // Extra-large screens (1360px and up)
    "3xl": "96em", // 2x extra-large screens (1536px and up)
    "4xl": "144em", // 3x extra-large screens (2304px and up)
    "5xl": "192em", // 4x extra-large screens (3072px and up)
  },
  fonts: {
    shantellSans: `'Shantell Sans', sans-serif`,
    agbalumo: `'Agbalumo', sans-serif`,
    pacifico: `'Pacifico', sans-serif`,
    greatVibes: `'Great Vibes', sans-serif`,
    playpenSans: `'Playpen Sans', sans-serif`,
  },
});

export default theme;
