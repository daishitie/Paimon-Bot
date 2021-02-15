const mongo = require('@root/mongo')
const stickyMessageSchema = require('@schemas/sticky-message-schema')

module.exports = {
    commands: ['stickymessage', 'stickymsg'],
    description: `Set server's sticky message.`,
    expectedArgs: `<message>`,
    minArgs: 1,
    callback: async (message, arguments, text, client, cache) => {
        const { channel, guild } = message
        let data = cache[`sticky-${guild.id}`]
        
        await mongo().then(async (mongoose) => {
            try {
                if (data && data !== 1) {
                    cache[`sticky-${guild.id}`][5] = text
                } else {
                    cache[`sticky-${guild.id}`] = [false, 1, 0, ``, ``, text]
                }

                await stickyMessageSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    text: text
                }, {
                    upsert: true,
                    useFindAndModify: false
                })

                await message.reply(`Sticky message set to \`\`\`${text}\`\`\``)
            } finally {
                mongoose.connection.close()
            }
        })
    },
    permissions: ['ADMINISTRATOR']
}