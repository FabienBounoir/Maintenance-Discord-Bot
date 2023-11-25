const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ButtonStyle, Message } = require("discord.js");
const lang = require("../utils/languageManager");

/**
 * 
 * @param {Message} message 
 */
function handleMessageCreate(message) {
    if ((!message?.content) || (!message?.content.startsWith(process.env.PREFIX) && (!message.content.includes(`<@${message.client.user.id}>`)))) return;

    message.client.counter++;

    const language = message?.guild?.preferredLocale || process.env.DEFAULT_LANGUAGE;

    const embed = new EmbedBuilder().setColor("2b2d31")
    const rows = []

    let description = lang("MAINTENANCE_IN_PROGRESS", language) + "\n"

    if (process.env.MAINTENANCE_MESSAGE) {
        description += lang("MAINTENANCE_MESSAGE", language)
        description += `\n\`\`\`ansi\n[2;37m${process.env.MAINTENANCE_MESSAGE}[0m\`\`\``
    }

    if (process.env.JOIN_SUPPORT_SERVER) {
        embed.setFooter({ text: lang("JOIN_SUPPORT_SERVER", language) })
    }

    if (process.env.SUPPORT_SERVER) {
        rows.push(new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel(lang("SUPPORT_SERVER", language)).setStyle(ButtonStyle.Link).setURL(process.env.SUPPORT_SERVER)
        ))
    }

    embed.setDescription(description)

    message.author.send({ embeds: [embed], components: rows })
    message.react("📬").then((reaction) => {
        setTimeout(() => {
            reaction.remove()
        }, 7000)
    })
}

module.exports = handleMessageCreate;
