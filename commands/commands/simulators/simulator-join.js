const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

const mongo = require('@root/mongo')
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
            let text = data[1].replace(/<@>/g, `<@${member.id}>`)

            if (
                guild.id === `793876465846059008` ||
                guild.id === `785156593935056967` ||
                guild.id === `817767586934685696` ||
                guild.id === `819508971387224064`
            ) {
                embed.setColor(`RANDOM`)
                    .setDescription(text)

                client.channels.cache.get(data[0])
                    .send({ embed: embed })
                    .catch(console.error)
            } else {
                client.channels.cache.get(data[0])
                    .send(text)
                    .catch(console.error)
            }
        }
    },
    permissions: ['ADMINISTRATOR']
}