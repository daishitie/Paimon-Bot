require('module-alias/register')
require('dotenv').config()

const { Client, MessageEmbed } = require('discord.js')

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const embed = new MessageEmbed()

const { developer } = require('@root/config.json')
const mongo = require('@root/mongo')

const commandBase = require('@root/commands/command-base')
const loadCommands = require('@root/commands/load-commands')
const loadFeatures = require('@root/features/load-features')

const cache = {}

client.on('ready', async () => {
    console.log(`Connecting to database...`)

    await mongo().then(mongoose => {
        try {
            console.log(`Successfully connected to database!\n`)
            console.log(`Paimon is ready!`)

            client.user.setActivity(`${developer.username}`, { type: `WATCHING` })
                .then(presence => console.log(`Activity set to ${presence.activities[0].name}\n`))
                .catch(console.error)
        } finally {
            mongoose.connection.close()
        }
    })

    await commandBase.loadPrefixes(client, cache)
    await loadCommands(client, embed, cache)
    await loadFeatures(client, embed, cache)
})

client.setMaxListeners(11)

client.login(process.env.PAIMON_TOKEN)