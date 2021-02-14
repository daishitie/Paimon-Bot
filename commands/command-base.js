const mongo = require('@root/mongo')
const prefixSchema = require('@schemas/prefix-schema')
const { prefix: defaultPrefix } = require('@root/config.json')

const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACK_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS'
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}`)
        }
    }
}

let cacheRunCmd = []

module.exports = (client, embed, options, cache) => {
    let {
        commands,
        expectedArgs,
        permissionError = `You do not have permission to run this command!`,
        cooldown = -1,
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        servers = [],
        channels = [],
        callback
    } = options

    if (typeof commands === `string`) {
        commands = [commands]
    }

    // console.log(`Registering command "${commands[0]}`)

    if (permissions.length) {
        if (typeof permissions === `string`) {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }

    if (servers.length) {
        if (typeof servers === `string`) {
            servers = [servers]
        }
    }

    if (channels.length) {
        if (typeof channels === `string`) {
            channels = [channels]
        }
    }

    client.on('message', async (message) => {
        if (message.author.bot || !message.guild) return

        const { member, content, guild } = message
        let prefix = cache[`prefix-${guild.id}`] || defaultPrefix

        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                // Permissions
                
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError)
                        return
                    }
                }

                // Servers

                if (servers.length) {
                    let serverOnly = false
                    
                    for (const server of servers) {
                        if (guild.id === server) {
                            serverOnly = true
                        }
                    }

                    if (!serverOnly) {
                        message.reply(`This command is not allowed in this server!`)
                        return
                    }
                }

                // Channels

                if (channels.length) {
                    let channelOnly = false
                    let allowedChannels = ``

                    for (const channel of channels) {
                        if (message.channel.id === channel) {
                            channelOnly = true
                        } else {
                            allowedChannels += `<#${channel}>\n`
                        }
                    }

                    if (!channelOnly) {
                        message.reply(`This command is only allowed in the following channel(s):\n\n${allowedChannels}`)
                        return
                    }
                }

                // Cooldown
                // guildid-memberid-command
                let cooldownId = `${guild.id}-${member.id}-${commands[0]}`
                if (cooldown > 0 && cacheRunCmd.includes(cooldownId)) {
                    message.reply(`You cannot use that command so soon, please wait.`)
                    return
                }

                const arguments = content.split(/[ ]+/)
                arguments.shift()

                if (
                    arguments.length < minArgs ||
                    (
                        maxArgs != null &&
                        arguments.length > maxArgs
                    )
                ) {
                    message.reply(`Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`)
                    return
                }

                if (cooldown > 0) {
                    cacheRunCmd.push(cooldownId)
                    setTimeout(() => {
                        cacheRunCmd = cacheRunCmd.filter((string) => {
                            string !== cooldownId
                        })
                    }, 1000 * cooldown)
                }

                callback(message, arguments, arguments.join(' '), client, embed, cache)
                return
            }
        }
    })
}

module.exports.loadPrefixes = async (client, cache) => {
    await mongo().then(async (mongoose) => {
        try {
            console.log(`Loaded Prefixes:`)
            for (const guild of client.guilds.cache) {
                const result = await prefixSchema.findOne({ _id: guild[1].id })

                if (result) {
                    cache[`prefix-${guild[1].id}`] = result.prefix
                    console.log(`\t${guild[1].name} (${guild[1].id}): ${result.prefix}\n`)
                }
            }
        } finally {
            mongoose.connection.close()
        }
    })
}