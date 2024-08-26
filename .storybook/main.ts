import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
    "@chromatic-com/storybook"
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  staticDirs: ["../public"],

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
export default config;