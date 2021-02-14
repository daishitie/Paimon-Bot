module.exports = {
    commands: ['setpresence'],
    description: `Set custom bot activity.`,
    expectedArgs: `<activity>`,
    minArgs: 1,
    callback: async (message, arguments, text, client, embed, cache) => {
        client.user.setPresence({
            activity: {
                name: text,
                type: 0,
            }
        })
    },
    permissions: ['ADMINISTRATOR']
}