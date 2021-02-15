const { guildId, channelId } = require('@root/config-hihoberry.json')

module.exports = async (client, cache) => {
    const updateMembers = async (guild) => {
        const channel = await guild.channels.cache.get(channelId.members)
        if (channel) {
            await channel.setName(`member-count: ${guild.members.cache.filter(m => !m.user.bot).size}`)
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