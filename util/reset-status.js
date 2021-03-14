const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

const moment = require('moment-timezone')

const firstMessage = require('@util/first-message')

embed.setColor(`#2f3136`)
    .setTitle(`Server Time`)
    .setImage(`https://img-os-static.mihoyo.com/upload/2021/03/12/11d7753920d16f002faf65f57f97f5e3.png`)

module.exports = async (client, channels) => {
    if (typeof channels === `string`) channels = [channels]

    let currentTime,
        reset, 
        dailyReset, 
        weeklyReset = undefined

    const timezone = [`NA`,`EU`,`ASIA`,`SAR`]

    moment.relativeTimeThreshold('m', 60)
    moment.relativeTimeThreshold('h', 24*2)

    timezone.forEach(async (timezone) => {
        switch (timezone) {
            case `NA`:
                currentTime = `\`\`\`md\n# ${timezone} `
                timezone = `America/Chicago`
                time = `090000`
                break
            case `EU`:
                currentTime = `\`\`\`text\n# ${timezone} `
                timezone = `Europe/Paris`
                time = `030000`
                break
            case `ASIA`:
                currentTime = `\`\`\`glsl\n# ${timezone} `
                timezone = `Asia/Manila`
                time = `20000`
                break
            case `SAR`:
                currentTime = `\`\`\`fix\n# ${timezone} `
                timezone = `Asia/Taipei`
                time = `20000`
                break
            default:
                timezone = `Asia/Manila`
                time = `00000`
                currentTime = `\`\`\`text\n# DEFAULT `
        }

        currentTime += `${moment().tz(timezone).format(`hh:mm A`)}\`\`\``

        if (moment().tz(timezone) >= moment(time, `hhmmss`).tz(timezone)) {
            dailyReset = moment(time, `hhmmss`).tz(timezone).add(`1`, `days`).fromNow()
        } else {
            dailyReset = moment(time, `hhmmss`).tz(timezone).fromNow()
        }
    
        weeklyReset = moment().tz(timezone).startOf(`isoweek`).add(`7`, `days`).add(`4`, `hours`).fromNow()
    
        if (reset === undefined) {
            reset = `${currentTime}• Daily reset ${dailyReset}\n• Weekly reset ${weeklyReset}`
        } else {
            reset += `${currentTime}• Daily reset ${dailyReset}\n• Weekly reset ${weeklyReset}`
        }
    });

    channels.forEach(async (channel) => await firstMessage(client, channel, { embed: embed.setDescription(reset) }, []))
}