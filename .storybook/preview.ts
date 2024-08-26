import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.normal },
      darkClass: "dark",
      lightClass: "light",
      classTarget: "html",
      stylePreview: true,
    },
  },

  tags: ["autodocs"],
};

export default preview;
