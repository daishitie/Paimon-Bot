const { MessageEmbed } = require('discord.js')
const moment = require('moment-timezone')
const embed = new MessageEmbed()

const firstMessage = require('@util/first-message')

module.exports = async (client, cache) => {
    let time = new Date()
    let naDailyReset, euDailyReset, asiaDailyReset = ``
    let naWeeklyReset, euWeeklyReset, asiaWeeklyReset = ``

    embed.setColor(`#2f3136`)
        .setTitle(`Server Time`)
        .setImage(`https://img-os-static.mihoyo.com/upload/2021/03/01/1bf8aad92d66f4663c653057cd9fe167.png`)

    moment.relativeTimeThreshold('m', 60);
    moment.relativeTimeThreshold('h', 24);

    async function status() {
        if (new Date() - time >= 1000 * 45) {
            let na = `\`\`\`md\n# NA ${moment().tz(`America/New_York`).format(`LT`)}\`\`\``
            let eu = `\`\`\`text\n# EU ${moment().tz(`Europe/Paris`).format(`LT`)}\`\`\``
            let asia = `\`\`\`glsl\n# ASIA ${moment().tz(`Asia/Manila`).format(`LT`)}\`\`\``
            let sar = `\`\`\`fix\n# SAR ${moment().tz(`Asia/Taipei`).format(`LT`)}\`\`\``

            if (moment().tz(`America/New_York`).format(`LLL`) >= moment(`170000`, `hhmmss`).tz(`America/New_York`).format(`LLL`)) {
                naDailyReset = moment(`170000`, `hhmmss`).tz(`America/New_York`).add(`1`, `days`).fromNow()
            } else {
                naDailyReset =  moment(`170000`, `hhmmss`).tz(`America/New_York`).fromNow()
            }

            naWeeklyReset = moment().tz(`America/New_York`).endOf(`week`).add(`1`, `days`).add(`17`, `hours`).add(`1`, `minutes`).fromNow()

            if (moment().tz(`Europe/Paris`).format(`LLL`) >= moment(`110000`, `hhmmss`).tz(`Europe/Paris`).format(`LLL`)) {
                euDailyReset = moment(`110000`, `hhmmss`).tz(`Europe/Paris`).add(`1`, `days`).fromNow()
            } else {
                euDailyReset =  moment(`110000`, `hhmmss`).tz(`Europe/Paris`).fromNow()
            }

            euWeeklyReset = moment().tz(`Europe/Paris`).endOf(`week`).add(`1`, `days`).add(`11`, `hours`).add(`1`, `minutes`).fromNow()

            if (moment().tz(`Asia/Manila`).format(`LLL`) >= moment(`040000`, `hhmmss`).tz(`Asia/Manila`).format(`LLL`)) {
                asiaDailyReset = moment(`030000`, `hhmmss`).tz(`Asia/Manila`).add(`1`, `days`).fromNow()
            } else {
                asiaDailyReset =  moment(`030000`, `hhmmss`).tz(`Asia/Manila`).fromNow()
            }

            asiaWeeklyReset = moment().tz(`Asia/Manila`).endOf(`week`).add(`1`, `days`).add(`4`, `hours`).add(`1`, `minutes`).fromNow()

            let naReset = `• Daily reset ${naDailyReset}\n• Weekly reset ${naWeeklyReset}`
            let euReset = `• Daily reset ${euDailyReset}\n• Weekly reset ${euWeeklyReset}`
            let asiaReset = `• Daily reset ${asiaDailyReset}\n• Weekly reset ${asiaWeeklyReset}`
            let sarReset = `• Daily reset ${asiaDailyReset}\n• Weekly reset ${asiaWeeklyReset}`

            embed.setDescription(`${na}${naReset}\n${eu}${euReset}\n${asia}${asiaReset}\n${sar}${sarReset}`)
            
            await firstMessage(client, `819631361232076820`, embed, [])
            await firstMessage(client, `819667528728051743`, embed, [])
            await firstMessage(client, `819667767615553626`, embed, [])

            time = new Date()
            setTimeout(status, 1000 * 15)
        } else {
            setTimeout(status, 1000 * 15)
        }
    }

    setTimeout(status, 1000 * 15)
}