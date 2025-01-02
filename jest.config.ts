import type { Config } from "jest";

const config: Config = {
  verbose: true,
  setupFiles: ["jest-localstorage-mock"],
  preset: "jest-expo",
};

export default config;
