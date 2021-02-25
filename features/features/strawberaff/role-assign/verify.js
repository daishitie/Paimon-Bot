const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

const { channelId, color } = require('@root/config-strawberaff.json')
const firstMessage = require('@util/first-message')

module.exports = async (client, cache) => {
    let assignedChannel = channelId.roleAssign.verify

    embed
        .setColor(color.info)
        .setDescription(`**Click on the " 🍓 " emoji to get verified**`)

    firstMessage(client, assignedChannel, { embed: embed }, ['🍓'])

    const handleReaction = (reaction, user, add) => {
        if (user.bot) return

        const verify = reaction._emoji.name
        const { guild } = reaction.message

        if (verify != '🍓') return

        const role = guild.roles.cache.find(role => role.name === 'SaRaff Squad & Strawbaby')
        const member = guild.members.cache.find(member => member.id === user.id)

        if (add) {
            member.roles.add(role)
        } else {
            member.roles.remove(role)
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === assignedChannel) {
            handleReaction(reaction, user, true)
        }
    })

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === assignedChannel) {
            handleReaction(reaction, user, false)
        }
    })
}