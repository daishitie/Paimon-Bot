module.exports = {
    commands: ['server'],
    description: `Simulate join message.`,
    callback: async (message, arguments, text, client, embed, cache) => {
        const { guild } = message

        client.guilds.cache.forEach(g => {
            if (g.id === guild.id) {
                message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`)
            }
        })
    },
    permission: ['ADMINISTRATOR']
}