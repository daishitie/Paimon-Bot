const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

const { color } = require('@root/config.json')
const mongo = require('@root/mongo')
const stickyMessageSchema = require('@schemas/sticky-message-schema')

module.exports = async (client, cache) => {
    client.on('message', async (message) => {
        if (message.author.bot || !message.guild) return
        const { channel, guild } = message
        let data = cache[`sticky-${guild.id}`]

        if (!data) {
            await mongo().then(async (mongoose) => {
                try {
                    const result = await stickyMessageSchema.findOne({ _id: guild.id }).catch(console.error)
                    
                    if (result) {
                        cache[`sticky-${guild.id}`] = data = [result.isEnable, result.maxCount, 0, ``, result.channelId, result.text]
                    } else {
                        cache[`sticky-${guild.id}`] = data = [false, 1, 0, ``, ``, ``]
                    }
                } finally {
                    mongoose.connection.close()
                }
            })
        }

        if (data) {
            if (data[0] && data[5] !== ``) {
                if (channel.id === data[4]) {
                    data[2]++
    
                    if (data[2] === data[1]) {
                        if (data[3] && data[3] !== ``) await data[3].delete({ timeout: 750 }).catch(uwu => {})
    
                        embed
                            .setColor(color.info)
                            .setTitle(`📌 Pinned Message`)
                            .setDescription(data[5])
    
                        data[3] = await channel.send({ embed: embed }).catch(uwu => {})
                        data[2] = 0
    
                        cache[`sticky-${guild.id}`] = data = [data[0], data[1], data[2], data[3], data[4], data[5]]
                    }
    
                    cache[`sticky-${guild.id}`][2] = data[2]
                }
            }
        }
    })
}