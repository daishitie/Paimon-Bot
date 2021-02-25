const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

const firstMessage = require('@util/first-message')
const { botId, channelId, color } = require('@root/config-strawberaff.json')

module.exports = (client, cache) => {
    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)
    let assignedChannel = channelId.roleAssign.game

    const games = {
        daishitie_genshin: '⠀⠀⠀⠀⠀⠀⠀Genshin Impact⠀⠀⠀⠀⠀⠀⠀',
        daishitie_mobile_legends: '⠀⠀⠀⠀⠀⠀⠀Mobile Legends⠀⠀⠀⠀⠀⠀⠀',
        daishitie_valorant: '⠀⠀⠀⠀⠀⠀⠀⠀⠀Valorant⠀⠀⠀⠀⠀⠀⠀⠀⠀',
        daishitie_league_of_legends: '⠀⠀⠀⠀⠀⠀League of Legends⠀⠀⠀⠀⠀⠀',
        daishitie_among_us: '⠀⠀⠀⠀⠀⠀⠀⠀Among Us⠀⠀⠀⠀⠀⠀⠀⠀'
    }

    const reactions = []

    let content = `**Pick the game that you're playing to access the specific category.**\n`
        content += `React to give yourself a role.\n\n`

    for (const key in games) {
        const game = getEmoji(key)
        reactions.push(game)

        const role = games[key].replace(/[⠀]/g, '')
        content += `${game} : \`${role}\`\n\n`
    }

    embed
        .setColor(color.info)
        .setDescription(content)

    firstMessage(client, assignedChannel, embed, reactions)

    const handleReaction = (reaction, user, add) => {
        if (user.bot) return

        const emoji = reaction._emoji.name
        const { guild } = reaction.message
        const gameRole = games[emoji]

        if (!gameRole) return

        let role = ''
        let member = ''

        if (gameRole) {
            role = guild.roles.cache.find(role => role.name === gameRole)
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