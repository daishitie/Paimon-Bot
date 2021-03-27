module.exports = async (client, message, text, name, avatar) => {
    const { channel, guild } = message

    if (!name) name = `Paimon`
    if (!avatar) avatar = client.user.avatarURL()

    channel.createWebhook(name, { avatar: avatar })
        .then(async (w) => {
            await w.send(text)

            const hooks = await guild.fetchWebhooks()
            await hooks.forEach(async (webhook) => {
                if (
                    webhook.channelID !== channel.id &&
                    webhook.owner.id !== client.user.id &&
                    webhook.name !== name
                ) return

                webhook.delete()
            })
        })
}