const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const lang = require("./utils/languageManager");
require('dotenv').config();
const handleMessageCreate = require('./events/message');
const handleInteractionCreate = require('./events/interaction');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
    presence: {
        status: "idle",
        activities: [{ name: `${(lang("MAINTENANCE_IN_PROGRESS", process.env.DEFAULT_LANGUAGE)).replace("### ", "")}`, type: ActivityType.Custom }]
    },
});

client.counter = 0;

client.on('ready', () => {
    console.log(`🔄 Maintenance Bot logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', handleInteractionCreate);
client.on('messageCreate', handleMessageCreate);

client.login(process.env.BOT_TOKEN);

setInterval(() => {
    if (client.counter > 0) {
        console.log(`🔄 Maintenance disrupted ${client.counter} users!`);
    }
}, 60000);

//AntiCrash
process.on("unhandledRejection", async (reason, promise) => {
    console.error("❌ Unhandled Rejection at:", promise, "📝 reason:", reason);
});

process.on("uncaughtException", async (err, origin) => {
    console.error(`${err}\n` + `Exception origin: ${origin}`);
});