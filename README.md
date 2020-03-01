# chronobot
### *A simple discord bot for monitoring daily deals on Chrono.gg*

---
## Installation
Clone the repository, and run `npm i` to download dependencies.

Create a file named `.env` in the root directory, with the following contents:

```
DISCORD_TOKEN=<your_discord_bot_token>
CHANNEL_ID=<your_channel_id>
```

Easiest way is to leave the process running in screen. It will automatically embed the latest deal on startup before defaulting to the 24hr countdown.