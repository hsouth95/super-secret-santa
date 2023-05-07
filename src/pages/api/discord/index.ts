// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";

const token = process.env.DISCORD_BOT_TOKEN;

export default function handler(req: any, res: any) {
  // Create a new client instance
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  // When the client is ready, run this code (only once)
  // We use 'c' for the event parameter to keep it separate from the already defined 'client'
  client.once(Events.ClientReady, (c: any) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

    client.users.fetch("userid").then((user) => {
      console.log(user);
      user.createDM(true).then((dm) => {
        console.log("DM creating");
        dm.send("Hello, world!");
      });
    });
  });

  // Log in to Discord with your client's token
  client.login(token);

  res.status(200).json({ name: "John Doe" });
}
