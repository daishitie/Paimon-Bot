module.exports = {
    commands: ['stream'],
    description: `Share other streamer's live.`,
    expectedArgs: `<@streamer> <stream link> [optional description]`,
    minArgs: 2,
    maxArgs: null,
    callback: async (message, arguments, text, client, cache) => {
        let format = `Hey @here, **${arguments[0]}** is now live! Go Drop a Like, Comment, and Share the stream!\n`
            format += `${arguments[1]}`

        if (arguments.length > 2) {
            arguments.shift()
            arguments.shift()
            format += `\n\n${arguments.join(' ')}`
        }
    
        message.delete({ timeout: 750 })
        message.channel.send(format)
    },
    permissions: ['ADMINISTRATOR'],
    servers: ['793876465846059008','795185386530799657']
}