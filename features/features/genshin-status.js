const { MessageEmbed } = require('discord.js')
const resetStatus = require('@util/reset-status')

module.exports = async (client, cache) => {
    let time = new Date()

    async function status() {
        if (new Date() - time >= 1000 * 10) {
            await resetStatus(client, 
                [
                    // underground
                    `819826603752292362` 
                    // `819631361232076820`,
                    // `819667528728051743`,
                    // `819672367134670849`,
                    // `819816569638748179`,
                    // `820480739127590922`
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