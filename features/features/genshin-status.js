const { MessageEmbed } = require('discord.js')
const moment = require('moment-timezone')
const embed = new MessageEmbed()

const resetStatus = require('@util/reset-status')

module.exports = async (client, cache) => {
    let time = new Date()

    moment.relativeTimeThreshold('m', 60);
    moment.relativeTimeThreshold('h', 24*2);

    async function status() {
        if (new Date() - time >= 1000 * 10) {
            await resetStatus(client, 
                [
                    // `819826603752292362` underground
                    `819631361232076820`,
                    `819667528728051743`,
                    `819672367134670849`,
                    `819816569638748179`
                ], [
                    `NA`, 
                    `EU`, 
                    `ASIA`, 
                    `SAR`
                ]
            )

            time = new Date()
            setTimeout(status, 1000 * 1)
        } else {
            setTimeout(status, 1000 * 1)
        }
    }

    setTimeout(status, 1000 * 1)
}