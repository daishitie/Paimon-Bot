const { MessageEmbed } = require('discord.js')
const embed1 = new MessageEmbed()
const embed2 = new MessageEmbed()
const embed3 = new MessageEmbed()
const embed4 = new MessageEmbed()
const embed5 = new MessageEmbed()

const webhookMessage = require('@util/webhook-message')
const { color } = require('@root/config-paimon-impact.json')

module.exports = {
    commands: ['setdirectory'],
    description: `Send the set of directories.`,
    cooldown: 3,
    callback: async (message, arguments, text, client, cache) => {
        const { author, channel, guild } = message

        embed1
            .setColor(color.info)
            .setTitle(`─ Server Directory`)
            .setDescription(`*This is your guide to the server's channels that vary in topics.*`)
            .setImage(`https://cdn.discordapp.com/attachments/819102097218863117/825272783726051338/paimon_impact_server_directory.png`)

        embed2
            .setColor(color.info)
            .setTitle(`Information`)
            .setDescription(`<#815806492753657857>\nPaimon Impact news and announcements.\n`
                + `<#815806638572699688>\nPaimon Impact discord server updates.\n`
                + `<#815806737093099541>\nGenshin Impact news, updates, and announcements.\n`
                + `<#815873729241677907>\nPick the server that you're playing on and select your world level.\n`
                + `<#785156594379128834>\nDiscord assistance desk, if someone having a hard time in our discord.\n`
                + `<#815806943296880650>\nPaimon Impact discord server boosts.`)
        
        embed3
            .setColor(color.info)
            .setTitle(`Teyvat`)
            .setDescription(`<#785491139993272320>\nGeneral Discussion.\n`
                + `<#815661801739911178>\nAll discussions unrelated to Genshin Impact.\n`
                + `<#817703607503683606>\nMeme's Channel.\n`
                + `<#819505977475858432>\nDrop your meme templates here.\n`
                + `<#815662591333761104>\nSuggestions and Feedbacks to the server.\n`
                + `<#815661881984417812>\nUse this channel for queueing, avoid any unnecessary conversation.\n`
                + `<#825120371770523658>\nUse this if you didn't have any mic.`)

        embed4
            .setColor(color.info)
            .setTitle(`CO-OP`)
            .setDescription(`<#824530618875641876>\nNeed co-op or help with domain or farm? Just leave a message here.`)

        embed5
            .setColor(color.info)
            .setTitle(`GENSHIN INFO`)
            .setDescription(`<#808706827340087316>\nGenshin Impact lores.\n`
                + `<#785156594379128833>\nGenshin Impact tips.\n`
                + `<#785925866311516201>\nGenshin Impact character builds.\n`
                + `<#789479730113150996>\nGenshin Impact character level up materials.\n`
                + `<#808643460021747724>\nGenshin Impact character and weapon level up costs.`)

        await webhookMessage(
            client, 
            message,
            {
                embeds: [
                    embed1,
                    embed2,
                    embed3,
                    embed4,
                    embed5,
                ]
            },
            `Paimon Impact`,
            `https://cdn.discordapp.com/attachments/819102097218863117/825265260763414598/paimon_impact.png`
        )

        await message.delete({ timeout: 1000 })
    },
    permission: ['ADMINISTRATOR'],
    servers: ['785156593935056967']
}