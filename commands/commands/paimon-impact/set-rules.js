const { MessageEmbed } = require('discord.js')
const embed1 = new MessageEmbed()
const embed2 = new MessageEmbed()
const embed3 = new MessageEmbed()
const embed4 = new MessageEmbed()
const embed5 = new MessageEmbed()
const embed6 = new MessageEmbed()
const embed7 = new MessageEmbed()

const webhookMessage = require('@util/webhook-message')
const { color } = require('@root/config-paimon-impact.json')

module.exports = {
    commands: ['setrules'],
    description: `Send the set of rules.`,
    cooldown: 3,
    callback: (message, arguments, text, client, cache) => {
        const { author, channel, guild } = message

        embed1.setColor(color.info)
            .setTitle(`─ Server Rules`)
            .setDescription(`*Read them carefully and make sure you follow them correctly.*`)

        embed2.setColor(color.info)
            .setTitle(`Rule #1`)
            .setDescription(`Act mature and composed, no racism, hate speech, drama, harassment, etc. Do not direct any derogatory remarks at any person or group of people. Please keep conversations wholesome and positive!

            1.1. Do not discuss any heated topics, such as politics or religion, that could incite arguments or aggression.
            
            \`\`\`YAML\n[That includes, but is not limited to:]\nGender, race, ethnicity, age, sexuality, religious affiliation/beliefs, political affiliation/beliefs*, and background.\`\`\`
            Avoid any sensitive topics as much as possible as we’re only a Genshin Impact-related server, no more than that.
            
            1.2. Be sensitive to other members around you, respect their privacy and treat everyone nicely, respect each other’s views and opinions. Just because someone might have a different opinion than yours doesn’t give you the right to force yours onto them.
            
            1.3. Do not excessively spam walls of text, reactions and emojis, images and GIFs or type in caps, text chains, copypastas, etc.
            
            1.4. Do not use any inappropriate profile pictures and nicknames. As an extension, if your profile name/nickname is illegible or unable to be mentioned, you will be asked to change (or we will change it). Server access will be revoked until the offending article has been changed and accepted by the staff team.
            
            1.5. [Banned Words List](https://docs.google.com/document/d/1XK2VRxzveNqSjFguWeS3XXECI97G5YNUncv4SdIaPfE/) Do not use these words when talking on our server. They are banned so we can keep the server wholesome and healthy. If any of our staff catch you trying to work around the banned words, staff will administer a fitting punishment.`)

        embed3.setColor(color.info)
            .setTitle(`Rule #2`)
            .setDescription(`Do not "Hornypost", as some people want to express their horniness, it's prohibited here.

            2.1. Do not post any NSFW/NSFL/R-18 messages or images that may be too obscene or extreme in nature, i.e; Scat, Vore, Lolis, Shotas, Rape, Gore, Hentai (Codes are included), Pornography, Animal Abuse, Explicit Nudity, Sexual Content and Death.
            
            \`\`\`YAML\n["Hornyposting" includes, but is not limited to:]\n- Stating your sexual desires out loud\n- Sharing links or images of exposed skin or body parts and messages with sexual innuendos with the intent of riling up sexual desires or horniness\n- Fantasizing or roleplaying in a sexual context or nature\`\`\`
            `)

        embed4.setColor(color.info)
            .setTitle(`Rule #3`)
            .setDescription(`Channel Relevancy, please use the individual text and voice channels appropriately (e.g. stay on-topic).

            Read the channel descriptions and use them for their intended purpose only as much as possible. Going off-topic every now and then is fine, but members of the staff will direct you to the appropriate channel as they deem needed. People who derail and are persistent in flooding a channel with unrelated things will receive corresponding sanction.
            `)

        embed5.setColor(color.info)
            .setTitle(`Rule #4`)
            .setDescription(`Respect the staff, their decisions, and their actions.

            Do not dispute the staff decisions in the public channels. Furthermore, do not cause trouble like encouraging muting or banning other members for no reason. The rules are subject to the staff's interpretation. Furthermore, avoid pinging them for unnecessary matters unless they are actively chatting.
            `)

        embed6.setColor(color.info)
            .setTitle(`Rule #5`)
            .setDescription(`Adhere to the [Discord Community Guidelines](https://discord.com/guidelines), [Discord Terms of Service](https://discord.com/terms), and [miHoYo Terms of Service](https://genshin.mihoyo.com/en/company/terms) at all times.`)

        embed7.setColor(color.info)
            .setTitle(`I disagree with my punishment, how can I appeal?`)
            .setDescription(`If you feel that you were punished erroneously or the decision to punish you was made without proper context, please send a direct message to <@&815560590156103740>. The appeal should contain the following, in as much detail as you find appropriate:
            
            \`\`\`YAML\n- A description of your actions and whether you believe your ban was justified\n- The thought process behind your actions leading up to your time out\n- Why your time out should be appealed\n- Any additional thoughts on your time out\`\`\`
            Please note that your appeal will not be considered if it lacks detail or isn't taken seriously.
            `)

        webhookMessage(
            client, 
            message,
            {
                embeds: [
                    embed1,
                    embed2,
                    embed3,
                    embed4,
                    embed5,
                    embed6,
                    embed7,
                ]
            }
        )
    },
    permission: ['ADMINISTRATOR'],
    servers: ['785156593935056967']
}