module.exports = {
    commands: 'ping',
    description: `Check Paimon's latency.`,
    cooldown: 3,
    callback: (message, arguments, text, client, cache) => {
        message.reply('Calculating ping...')
            .then((resultMessage) => {
                const ping = resultMessage.createdTimestamp - message.createdTimestamp

                let format = `Paimon's latency: **${ping}**\n`
                    format += `API latency: **${client.ws.ping}**`

                resultMessage.edit(format)
            })
    }
}