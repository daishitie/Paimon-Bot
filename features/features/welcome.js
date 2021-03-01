const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

const mongo = require('@root/mongo')
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
            let text = data[1].replace(/<@>/g, `<@${member.id}>`)

            if (
                guild.id === `793876465846059008` ||
                guild.id === `785156593935056967`
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
    })
}