import { config } from 'dotenv';
import { Client, GatewayIntentBits, MessageFlags, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import { get_exp } from "./get_exp.js";
config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const rest = new REST ({ version: '10'}).setToken(process.env.TOKEN);

client.on('ready',() => {
    console.log("bot has logged in" + client.user.tag);
})


client.on('interactionCreate', (interaction) => {
    if(interaction.isChatInputCommand()) {
        console.log(`hello world`);
        if (interaction.commandName === 'checklevel') {
            async function main2() {
                console.log(interaction.user.id);
                const memberDiscordId = interaction.user.id;
                const memberExp = await get_exp(memberDiscordId);
                // console.log('Member eexp:', memberExp);
                interaction.reply({ content: `Hey there! The member experience is ${memberExp}`});
            }

            // Call the main function
            main2();
        }
    }
});

async function main() {
    const commands = [
        {
            name: 'checklevel',
            description: 'test ee',
        },
        {
            name: 'proposal',
            description: 'test ee',
        },
    ];
    try {
        console.log("start");
        await rest.put (Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
            body: commands,
        });
        client.login(process.env.TOKEN);
    } catch(err) {
        console.log(err);
    }
} 

main();