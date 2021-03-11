const mongo = require('@root/mongo')
const welcomeMessage = require('@util/webhook-message')
const welcomeSchema = require('@schemas/welcome-schema')

module.exports = (client, cache) => {
    client.on('guildMemberAdd', async (member) => {
        const { guild } = member
        let data = cache[`welcome-${guild.id}`]

        if (!data) {
            await mongo().then(async (mongoose) => {
                try {
                    const result = await welcomeSchema.findOne({ _id: guild.id })
    
                    if (result) {
                        cache[`welcome-${guild.id}`] = data = [result.channelId, result.text]
                    } else {
                        cache[`welcome-${guild.id}`] = data = [``, ``]
                    }
                } finally {
                    mongoose.connection.close()
                }
            })
        }

        if (data[0] !== `` && data[1] !== ``) {
            welcomeMessage(client, guild, member, data)
        }
    })
}