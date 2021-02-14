const mongo = require('@root/mongo')
const welcomeSchema = require('@schemas/welcome-schema')

module.exports = (client, cache) => {
    client.on('guildMemberAdd', async (member) => {
        const { guild } = member
        let data = cache[`welcome-${guild.id}`]

        if (!data) {
            await mongo().then(async (mongoose) => {
                try {
                    const result = await welcomeSchema.findOne({ _id: guild.id })

                    cache[`welcome-${guild.id}`] = data = [result.channelId, result.text]
                } finally {
                    mongoose.connection.close()
                }
            })
        }

        client.channels.cache
            .get(data[0])
            .send(data[1].replace(/<@>/g, `<@${member.id}>`))
            .catch(console.error)
    })
}