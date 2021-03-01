require('module-alias/register')
require('dotenv').config()

const { Client } = require('discord.js')
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

const mongo = require('@root/mongo')
const commandBase = require('@root/commands/command-base')
const loadCommands = require('@root/commands/load-commands')
const loadFeatures = require('@root/features/load-features')

// For global cache
const cache = {}

// On client ready
client.on('ready', async () => {
    // Check database connection
    await mongo().then(mongoose => {
        try {
            console.log(`Successfully connected to database!\n${client.user.name} is ready!`)

            client.user.setActivity(`Genshin Impact`, { type: `PLAYING` })
                .then(presence => console.log(`Activity set to ${presence.activities[0].name}\n`))
                .catch(console.error)
        } finally {
            mongoose.connection.close()
        }
    })

    // Load prefixes, commands, and features
    await commandBase.loadPrefixes(client, cache)
    await loadCommands(client, cache)
    await loadFeatures(client, cache)
})

client.setMaxListeners(0)
client.login(process.env.PAIMON_TOKEN)