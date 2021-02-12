const { guildId, channelId } = require('@root/config-strawberaff.json')

module.exports = async (client, embed, cache) => {
    const updateMembers = async (guild) => {
        const channel = await guild.channels.cache.get(channelId.members)
        if (channel) {
            await channel.setName(`Strawbabies: ${guild.memberCount.toLocaleString()}`)
        }
    }

    client.on('guildMemberAdd', member => updateMembers(member.guild))
    client.on('guildMemberRemove', member => updateMembers(member.guild))

    const guild = client.guilds.cache.get(guildId)

    if (!guild) {
        console.log(`Unknown Guild: ${guildId}`)
        return
    }

    updateMembers(guild)
}