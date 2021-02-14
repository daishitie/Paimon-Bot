const mongo = require('@root/mongo')
const welcomeSchema = require('@schemas/welcome-schema')

module.exports = {
    commands: ['simulatorjoin', 'simjoin', 'sj'],
    description: `Simulate join message.`,
    callback: async (message, arguments, text, client, embed, cache) => {
        const { member, guild } = message
        let data = cache[`welcome-${guild.id}`]

        if (!data) {
            console.log(`[Welcome]: Fetching from database.`)

            await mongo().then(async (mongoose) => {
                try {
                    const result = await welcomeSchema.findOne({ _id: guild.id })
    
                    cache[`welcome-${guild.id}`] = data = [result.channelId, result.text]
                } finally {
                    mongoose.connection.close()
                }
            })
        }
    
        client.channels.cache.get(data[0])
            .send(data[1].replace(/<@>/g, `<@${member.id}>`))
            .catch(console.error)
    },
    permission: ['ADMINISTRATOR']
}