**Welcome to JJ's SlackBot**


**Commands**
Currently, it is equipped with simple features, with more to add on in the future, as of now the following commands can run.

1. jjw-help
2. jjw-ping
3. jjw-catfact
4. jjw-quote
5. jjw-joke

## Running locally

Create a local `.env` file with `SLACK_BOT_TOKEN` and `SLACK_APP_TOKEN`, then run:

```bash
npm install
npm start
```

The bot uses Slack Socket Mode, so it does not need a public webhook URL, but the process must stay running for slash commands to respond.

<img width="1600" height="581" alt="image" src="https://github.com/user-attachments/assets/92f6085b-dcfa-49a9-95ea-0c395c00e59f" />
