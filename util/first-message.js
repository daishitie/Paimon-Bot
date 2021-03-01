// Add reactions
const addReactions = (message, reactions) => {
    if (reactions.length > 0) {
        message.react(reactions[0])
        reactions.shift()

        setTimeout(() => addReactions(message, reactions), 1000)
    }
}

// First message
module.exports = async (client, channelId, text, reactions = []) => {
    const channel = await client.channels.cache.get(channelId)

    if (!channel) return console.error(`Unknown Channel ID: ${channelId}`)
    if (typeof reactions === 'string') reactions = [reactions]

    // Fetch messages
    channel.messages.fetch().then(async (messages) => {
        if (messages.size === 0) {
            await channel.send(text).then(message => addReactions(message, reactions))
            return
        } else {
            // Loop through messages
            for (const message of messages) {
                if (
                    message[1].author.id === client.user.id &&
                    message[1].content !== text
                ) {
                    await message[1].edit(text).then(() => addReactions(message[1], reactions))
                    return
                }
            }
        }
    })
}