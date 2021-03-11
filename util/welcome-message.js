const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

module.exports = async (client, guild, member, data) => {
    let text = data[1].replace(/<@>/g, `<@${member.id}>`)
    
    if (
        guild.id === `793876465846059008` ||
        guild.id === `785156593935056967` ||
        guild.id === `817767586934685696` ||
        guild.id === `819508971387224064`
    ) {
        embed.setColor(`RANDOM`)
            .setDescription(text)

        if (guild.id === `819508971387224064`) {
            embed.setImage(`https://cdn.discordapp.com/attachments/817767586934685699/819537259765432350/Qg-JQvJqabidVmpcPAPLUwUrxuBpN1VHtl-hUmMdUNg.png`)
        }

        client.channels.cache.get(data[0])
            .send({ embed: embed })
            .catch(console.error)
    } else {
        client.channels.cache.get(data[0])
            .send(text)
            .catch(console.error)
    }
}