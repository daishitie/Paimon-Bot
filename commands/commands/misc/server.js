module.exports = {
    commands: ['server'],
    description: `Display server member count.`,
    callback: async (message, arguments, text, client, cache) => {
        const { guild } = message

        client.guilds.cache.forEach(g => {
            if (g.id === guild.id) {
                message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`)
            }
        })
    },
    permission: ['ADMINISTRATOR']
}