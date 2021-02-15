const mongo = require('@root/mongo')
const stickyMessageSchema = require('@schemas/sticky-message-schema')

module.exports = {
    commands: ['stickymaxcount', 'stickymax', 'stickycount'],
    description: `Set server's sticky max message count.`,
    expectedArgs: `<number>`,
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client, cache) => {
        const { channel, guild } = message
        let data = cache[`sticky-${guild.id}`]

        if (isNaN(text)) {
            message.reply(`Sticky max message count must be a number!`)
            return
        }

        await mongo().then(async (mongoose) => {
            try {
                if (data && data !== 1) {
                    cache[`sticky-${guild.id}`][1] = parseInt(text)
                } else {
                    cache[`sticky-${guild.id}`] = [false, parseInt(text), 0, ``, ``, ``]
                }

                await stickyMessageSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    maxCount: text
                }, {
                    upsert: true,
                    useFindAndModify: false
                })

                await message.reply(`Sticky max message count set to ${text}`)
            } finally {
                mongoose.connection.close()
            }
        })
    },
    permissions: ['ADMINISTRATOR']
}