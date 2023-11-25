const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ButtonStyle, CommandInteraction } = require("discord.js");
const lang = require("../utils/languageManager");

/**
 * 
 * @param {CommandInteraction} interaction 
 * @returns 
 */
function handleInteractionCreate(interaction) {
    const language = interaction.locale || interaction.guild.preferredLocale || process.env.DEFAULT_LANGUAGE;

    interaction.client.counter++;

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

    interaction.reply({ embeds: [embed], components: rows, ephemeral: true }).catch(() => {
        interaction.followUp({ embeds: [embed], components: rows, ephemeral: true })
    })
}

module.exports = handleInteractionCreate;
