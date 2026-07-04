const axios = require("axios");
require("dotenv").config();
const { App, LogLevel } = require("@slack/bolt");

const requiredEnv = [
  ["SLACK_BOT_TOKEN", "xoxb-"],
  ["SLACK_APP_TOKEN", "xapp-"],
];

const envErrors = requiredEnv.flatMap(([key, prefix]) => {
  const value = process.env[key];

  if (!value) return [`${key} is missing`];
  if (!value.startsWith(prefix)) return [`${key} must start with ${prefix}`];

  return [];
});

if (envErrors.length > 0) {
  console.error(`Slack bot configuration error: ${envErrors.join("; ")}`);
  process.exit(1);
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  logLevel: process.env.SLACK_LOG_LEVEL || LogLevel.INFO,
});

const quotes = [
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
];

app.command("/jjw-help", async ({ ack, respond }) => {
  await ack();

  await respond({
    text: `Available Commands:
/jjw-ping - Check bot latency
/jjw-catfact - Get a cat fact
/jjw-quote - Get an inspirational quote
/jjw-joke - Get a random joke`
  });
});


app.command("/jjw-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/jjw-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/jjw-quote", async ({ ack, respond }) => {
  await ack();

  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  await respond({ text: `"${quote.text}"\n- ${quote.author}` });
});

app.command("/jjw-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

app.error(async (error) => {
  console.error("Slack app error:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();


