const mongo = require('@root/mongo')
const templateSchema = require('@schemas/template-schema')

module.exports = {
    commands: [],
    description: ``,
    expectedArgs: `<arg1> <arg2>`,
    permissionError: `You need administrator permission to run this command.`,
    cooldown: -1,
    minArgs: 0,
    maxArgs: null,
    callback: async (message, arguments, text, client, cache) => {
        await mongo().then(async (mongoose) => {
            try {
                // Save/Update/Read
            } finally {
                mongoose.connection.close()
            }
        })
    },
    permissions: [],
    roles: [],
    servers: [],
    channels: []
}