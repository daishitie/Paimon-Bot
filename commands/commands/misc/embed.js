const { MessageEmbed, MessageAttachment } = require('discord.js')
const embed = new MessageEmbed()

const { color } = require('@root/config.json')

module.exports = {
    commands: ['embed'],
    description: `Send custom embedded message.`,
    expectedArgs: `<message>`,
    cooldown: 3,
    minArgs: 1,
    callback: (message, arguments, text, client, cache) => {
        const { channel } = message

        message.delete({ timeout: 750 })

        embed.setColor(color.info)
            .setDescription(text)

        channel.send({ embed: embed })
    },
    permission: ['ADMINISTRATOR']
}