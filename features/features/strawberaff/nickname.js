const { channelId } = require('@root/config-strawberaff.json')

module.exports = async (client, embed, cache) => {
    client.on('message', async (message) => {
        if (message.author.bot || !message.guild) return

        if (message.channel.id === channelId.nickname) {
            const { guild, author, content } = message
            const member = guild.members.cache.get(author.id)

            if (content.length <= 32) {
                member.setNickname(content)
                    .catch(console.error)

                message.delete({ timeout: 1000 })
                    .catch(console.error)

                message.channel.send(`${author.username}#${author.discriminator}, You changed your nickname to \`${content}\``)
                    .catch(console.error)
            } else {
                message.reply(`Must be 32 or fewer in length`)
                    .catch(console.error)
            }
        }
    })
}