const mongo = require('@root/mongo')
const stickyMessageSchema = require('@schemas/sticky-message-schema')

module.exports = {
    commands: ['stickyenable'],
    description: `Set server's sticky enable.`,
    callback: async (message, arguments, text, client, cache) => {
        const { channel, guild } = message
        let data = cache[`sticky-${guild.id}`]

        await mongo().then(async (mongoose) => {
            try {
                if (data && data !== 1) {
                    cache[`sticky-${guild.id}`][0] = true
                    cache[`sticky-${guild.id}`][4] = channel.id
                } else {
                    cache[`sticky-${guild.id}`] = [true, 1, 0, ``, channel.id, ``]
                }

                await stickyMessageSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    isEnable: true,
                    channelId: channel.id,
                    lastSticky: ``
                }, {
                    upsert: true,
                    useFindAndModify: false
                })

                await message.reply(`Sticky message enabled and binded on this channel!`)
            } finally {
                mongoose.connection.close()
            }
        })
    },
    permissions: ['ADMINISTRATOR']
}