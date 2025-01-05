import type { Config } from "jest";

const config: Config = {
  verbose: true,
  setupFiles: ["./jest.setup.ts"],
  preset: "jest-expo",
};

export default config;
