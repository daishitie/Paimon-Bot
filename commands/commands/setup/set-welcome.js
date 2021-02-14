const mongo = require('@root/mongo')
const welcomeSchema = require('@schemas/welcome-schema')

module.exports = {
    commands: ['setwelcome', 'sw'],
    description: `Set server's welcome message.`,
    expectedArgs: `<arg1>`,
    minArgs: 1,
    callback: async (message, arguments, text, client, cache) => {
        await mongo().then(async (mongoose) => {
            try {
                const { channel, guild } = message
        
                cache[`welcome-${guild.id}`] = [channel.id, text]
                
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    channelId: channel.id,
                    text: text
                }, {
                    upsert: true,
                    useFindAndModify: false
                })

                await message.reply(`New welcome message set to: \`\`\`${text}\`\`\``)
            } finally {
                mongoose.connection.close()
            }
        })
    },
    permissions: ['ADMINISTRATOR']
}