module.exports = {
    commands: 'ping',
    description: `Check bot's latency.`,
    cooldown: 15,
    callback: (message, arguments, text, client, embed) => {
        message.reply('Calculating ping...')
            .then((resultMessage) => {
                const ping = resultMessage.createdTimestamp - message.createdTimestamp

                let format = `Bot's latency: **${ping}**\n`
                    format += `API latency: **${client.ws.ping}**`

                resultMessage.edit(format)
            })
    }
}