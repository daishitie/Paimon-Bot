const mongo = require('@root/mongo')
const prefixSchema = require('@schemas/prefix-schema')

module.exports = {
    commands: ['setprefix'],
    description: `Set server's default prefix.`,
    expectedArgs: `<new server prefix>`,
    cooldown: 3,
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client, cache) => {
        await mongo().then(async (mongoose) => {
            try {
                const { guild } = message

                cache[`prefix-${guild.id}`] = [text]

                await prefixSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    prefix: text
                }, {
                    upsert: true,
                    useFindAndModify: false
                })

                await message.reply(`New prefix for this server set to: \`${text}\``)
            } finally {
                mongoose.connection.close()
            }
        })
    },
    permissions: ['ADMINISTRATOR']
}