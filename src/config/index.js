const { config } = require("dotenv");

config();
const { env } = process;

const botConfig = {
  API_KEY: env.API_KEY,
  CLIENT_ID: env.CLIENT_ID,
};

module.exports = botConfig;
