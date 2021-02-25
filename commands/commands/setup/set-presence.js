module.exports = {
    commands: ['setpresence'],
    description: `Set custom bot activity.`,
    expectedArgs: `<activity>`,
    cooldown: 3,
    minArgs: 1,
    callback: async (message, arguments, text, client, cache) => {
        client.user.setPresence({
            activity: {
                name: text,
                type: 0,
            }
        })
    },
    permissions: ['ADMINISTRATOR']
}