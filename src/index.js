import { config } from 'dotenv';
import { Client, GatewayIntentBits, MessageFlags } from 'discord.js';

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.login(process.env.TOKEN);
client.on('ready',() => {
    console.log("bot has logged in" + client.user.tag);
})

client.on('messageCreate',(message)=> {
    console.log(message.content);
    console.log(message.createdAt);
    console.log(message.author.tag);
})