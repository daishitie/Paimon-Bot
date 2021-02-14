module.exports = {
    commands: ['live'],
    description: `Announce StrawbeRaff Stream.`,
    expectedArgs: `<stream link> [optional description]`,
    minArgs: 1,
    maxArgs: null,
    callback: async (message, arguments, text, client, cache) => {
        let format = `Hey <@&800764295554007051>, **StrawbeRaff** is now live! Go Drop a Like, Comment, and Share the stream!\n`
            format += `${arguments[0]}`

        if (arguments.length > 1) {
            arguments.shift()
            format += `\n\n${arguments.join(' ')}`
        }
    
        message.delete({ timeout: 750 })
        message.channel.send(format)
    },
    permissions: ['ADMINISTRATOR'],
    servers: ['793876465846059008']
}