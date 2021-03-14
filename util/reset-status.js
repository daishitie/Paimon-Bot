const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

const moment = require('moment-timezone')

const firstMessage = require('@util/first-message')

embed.setColor(`#2f3136`)
    .setTitle(`Server Time`)
    .setImage(`https://img-os-static.mihoyo.com/upload/2021/03/12/11d7753920d16f002faf65f57f97f5e3.png`)

module.exports = async (client, channels, timezone) => {
    if (typeof channels === `string`) channels = [channels]
    if (typeof timezone === `string`) timezone = [timezone]

    let currentTime,
        reset, 
        dailyReset, 
        weeklyReset = undefined

    moment.relativeTimeThreshold('m', 60)
    moment.relativeTimeThreshold('h', 24*2)

    timezone.forEach(async (timezone) => {
        switch (timezone) {
            case `NA`:
                timezone = `America/New_York`
                time = `090000`
                currentTime = `\`\`\`md\n# NA `
                break
            case `EU`:
                timezone = `Europe/Paris`
                time = `030000`
                currentTime = `\`\`\`text\n# EU `
                break
            case `ASIA`:
                timezone = `Asia/Manila`
                time = `20000`
                currentTime = `\`\`\`glsl\n# ASIA `
                break
            case `SAR`:
                timezone = `Asia/Taipei`
                time = `20000`
                currentTime = `\`\`\`fix\n# SAR `
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

        // ** DEBUG **
        // console.log(`\n${timezone}: ${moment().tz(timezone).format(`LLL`)}`)
        // console.log(`${timezone}: ${moment().tz(timezone).endOf(`isoweek`).format(`LLL`)}`)
        // console.log(`${timezone}: ${moment().tz(timezone).startOf(`isoweek`).format(`LLL`)}`)
        // console.log(`${timezone}: ${moment().tz(timezone).startOf(`isoweek`).add(`7`, `days`).add(`4`, `hours`).format(`LLL`)}`)
        // console.log(moment(time, `hhmmss`).tz(timezone).format(`LLL`))
    });

    channels.forEach(async (channel) => await firstMessage(client, channel, { embed: embed.setDescription(reset) }, []))
}