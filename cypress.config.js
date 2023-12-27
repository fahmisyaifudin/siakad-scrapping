const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });

      const configWithDotenv = require("dotenv").config();
      if (configWithDotenv.error) {
        throw configWithDotenv.error;
      }
      const env = { ...config.env, ...configWithDotenv.parsed };
      const result = { ...config, env };
      return result;
    },
  },
});
