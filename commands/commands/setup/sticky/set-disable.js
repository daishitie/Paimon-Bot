const mongo = require('@root/mongo')
const stickyMessageSchema = require('@schemas/sticky-message-schema')

module.exports = {
    commands: ['stickydisable'],
    description: `Set server's sticky disable.`,
    callback: async (message, arguments, text, client, cache) => {
        const { channel, guild } = message
        let data = cache[`sticky-${guild.id}`]

        await mongo().then(async (mongoose) => {
            try {
                if (data && data !== 1) {
                    cache[`sticky-${guild.id}`][0] = false
                    cache[`sticky-${guild.id}`][4] = ``
                } else {
                    cache[`sticky-${guild.id}`] = [false, 1, 0, ``, ``, ``]
                }

                await stickyMessageSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    isEnable: false,
                    channelId: ``
                }, {
                    upsert: true,
                    useFindAndModify: false
                })

                await message.reply(`Sticky message disabled!`)
            } finally {
                mongoose.connection.close()
            }
        })
    },
    permissions: ['ADMINISTRATOR']
}