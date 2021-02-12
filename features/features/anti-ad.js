module.exports = async (client, embed, cache) => {
    const isInvite = async (guild, code) => {
        return await new Promise((resolve) => {
            guild.fetchInvites().then((invites) => {
                for (const invite of invites) {
                    if (invite[0] === code) {
                        resolve(true)
                        return
                    }
                }

                resolve(false)
            })
        })
    }

    client.on('message', async (message) => {
        if (message.author.bot || !message.guild) return
        if (message.member.hasPermission('ADMINISTRATOR')) return

        const { author, content, guild } = message

        if (content.includes('discord.gg/')) {
            let code = content.split('discord.gg/')[1]
            code = code.split(/[ ]+/)[0]

            const isOurInvite = await isInvite(guild, code)

            if (!isOurInvite) {
                console.log(`\n[ADVERTISEMENT START]\nUser: ${author.username}#${author.discriminator} (${author.id})\nMessage: ${content}\n[ADVERTISEMENT END]`)

                embed.setColor(`#000000`)
                    .setDescription(`<@${author.id}>, Please do not advertise Discord servers.`)

                message.delete({ timeout: 1000 })
                    .catch(console.error)

                message.channel.send({ embed: embed })
                    .catch(console.error)
            }
        }
    })
}