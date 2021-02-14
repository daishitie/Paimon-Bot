const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

const firstMessage = require('@util/first-message')
const { channelId, color } = require('@root/config-hihoberry.json')

module.exports = (client, cache) => {
    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)
    let assignedChannel = channelId.roleAssign.genshin

    const regions = {
        element_cryo: 'NA',
        element_anemo: 'EU',
        element_electro: 'ASIA',
        element_geo: 'TW/HK'
    }

    const worldLevels = {
        '1️⃣': 'World Level 1',
        '2️⃣': 'World Level 2',
        '3️⃣': 'World Level 3',
        '4️⃣': 'World Level 4',
        '5️⃣': 'World Level 5',
        '6️⃣': 'World Level 6',
        '7️⃣': 'World Level 7',
        '8️⃣': 'World Level 8'
    }

    const reactions = []

    let content = `**Pick the server that you're playing on.**\n`
        content += `React to give yourself a role.\n\n`

    for (const key in regions) {
        const region = getEmoji(key)
        reactions.push(region)

        const role = regions[key]
        content += `${region} : \`${role}\`\n\n`
    }

    content += `\n\n**Select your world level.**\n`
    content += `React to the number based on your world level.\n\n`

    for (const key in worldLevels) {
        const worldLevel = key
        reactions.push(worldLevel)

        const role = worldLevels[key]
        content += `${worldLevel} : \`${role}\`\n\n`
    }

    embed
        .setColor(color.info)
        .setDescription(content)

    firstMessage(client, assignedChannel, embed, reactions)

    const handleReaction = (reaction, user, add) => {
        if (user.bot) return

        const emoji = reaction._emoji.name
        const { guild } = reaction.message
        const regionRole = regions[emoji]
        const worldLevelRole = worldLevels[emoji]

        if (!regionRole && !worldLevelRole) return

        let role = ''
        let member = ''

        if (regionRole) {
            role = guild.roles.cache.find(role => role.name === regionRole)
            member = guild.members.cache.find(member => member.id === user.id)
        }

        if (worldLevelRole) {
            role = guild.roles.cache.find(role => role.name === worldLevelRole)
            member = guild.members.cache.find(member => member.id === user.id)
        }

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