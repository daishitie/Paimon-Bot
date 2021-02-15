const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

const { color } = require('@root/config.json')

module.exports = {
    commands: ['sadmin'],
    description: `Send custom embedded message.`,
    minArgs: 2,
    callback: (message, arguments, text, client, cache) => {
        const { channel } = message

        message.delete({ timeout: 750 })

        embed.setColor(color.info)
            .setDescription(text)

        channel.send({ embed: embed })
    },
    permission: ['ADMINISTRATOR']
}