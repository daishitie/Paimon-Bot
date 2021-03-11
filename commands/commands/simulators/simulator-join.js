const mongo = require('@root/mongo')
const welcomeMessage = require('@util/welcome-message')
const welcomeSchema = require('@schemas/welcome-schema')

module.exports = {
    commands: ['simulatorjoin', 'simjoin'],
    description: `Simulate join message.`,
    cooldown: 3,
    callback: async (message, arguments, text, client, cache) => {
        const { member, guild } = message
        let data = cache[`welcome-${guild.id}`]

        if (!data) {
            await mongo().then(async (mongoose) => {
                try {
                    const result = await welcomeSchema.findOne({ _id: guild.id })
    
                    if (result) {
                        cache[`welcome-${guild.id}`] = data = [result.channelId, result.text]
                    } else {
                        cache[`welcome-${guild.id}`] = data = 1
                    }
                } finally {
                    mongoose.connection.close()
                }
            })
        }

        if (data != 1) {
            welcomeMessage(client, guild, member, data)
        }
    },
    permissions: ['ADMINISTRATOR']
}