const { MessageEmbed, Message } = require('discord.js');
const embed1 = new MessageEmbed();
const embed2 = new MessageEmbed();
const embed3 = new MessageEmbed();
const embed4 = new MessageEmbed();
const embed5 = new MessageEmbed();
const embed6 = new MessageEmbed();
const embed7 = new MessageEmbed();
const embed8 = new MessageEmbed();
const embed9 = new MessageEmbed();
const embed10 = new MessageEmbed();
const embed11 = new MessageEmbed();
const embed12 = new MessageEmbed();

const webhookMessage = require('@util/webhook-message');
const { color } = require('@root/config-paimon-impact.json');

module.exports = {
	commands: ['setrules'],
	description: 'Send the set of rules.',
	cooldown: 3,
	callback: async (message, arguments, text, client, cache) => {
		const { author, channel, guild } = message;

		embed1
			.setColor(color.info)
			.setTitle('─ Server Rules')
			.setDescription('*Read them carefully and make sure you follow them correctly.*')
			.setImage('https://cdn.discordapp.com/attachments/819102097218863117/825251054425735228/paimon_impact_server_rules.png');

		embed2
			.setColor(color.info)
			.setTitle('Rule #1')
			.setDescription('Adhere to the [Discord Community Guidelines](https://discord.com/guidelines), '
                + '[Discord Terms of Service](https://discord.com/terms), '
                + 'and [miHoYo Terms of Service](https://genshin.mihoyo.com/en/company/terms) at all times.');

		embed3
			.setColor(color.info)
			.setTitle('Rule #2')
			.setDescription('Act matured and composed, no racism, hate speech, drama, harassment, etc. '
                + 'Do not direct any derogatory remarks at any person or group of people. '
                + 'Please keep conversations wholesome and positive!\n\n'
                + '2.1.	Treat others as you would want to be treated. '
                + 'Do not harass other members and respect each other\'s choices and opinions. '
                + 'This also means any discriminatory or derogatory comments are not allowed, '
                + 'as are any trolling, elitism, incitement, or anything that deliberately '
                + 'attempts to elicit a negative response from other server members.\n\n'
                + '2.2.	Discussion of politics, religion, shootings, rape, or any other sensitive topics is not allowed, '
                + 'along with any especially vulgar language, as this may make others uncomfortable or cause unwanted drama or conflict.\n\n'
                + '2.3.	Do not excessively spam walls of text, reactions, emojis, '
                + 'images and GIFs or type in caps, text chains, copypastas, etc. '
                + 'This also extends to frequent posting of off-topic content with no context, and seizure GIFs/emojis.\n\n'
                + '2.4.	Do not post any irrelevant images or GIFs for ongoing conversations especially when chats are going fast. '
                + 'We highly encourage you to put your sources when sharing fan-arts.\n\n'
                + '2.5.	[Banned Words List](https://docs.google.com/document/d/1XK2VRxzveNqSjFguWeS3XXECI97G5YNUncv4SdIaPfE/) '
                + 'Do not use these words when talking on our server. '
                + 'They are banned so we can keep the server wholesome and healthy. '
                + 'If any of our staff catch you trying to work around the banned words, staff will administer a fitting punishment.\n\n'
                + '2.6.	No Advertising. Casual, subtle, or direct nudges to join Discord servers or follow social media is not allowed. '
                + 'If you wish to apply for a partnership, please message an Admin. '
                + 'This extends into Direct Messages with server members.\n\n'
                + '2.7.	Do not use any inappropriate profile pictures and nicknames. '
                + 'As an extension, if your profile name/nickname is illegible or unable to be mentioned, '
                + 'you will be asked to change (or we will change it).');

		embed4
			.setColor(color.info)
			.setTitle('Rule #3')
			.setDescription('Do not say/post/share anything that may make other members feel disturbed.\n\n'
                + '3.1.	Do not discuss any heated topics, such as politics or religion, that could incite arguments or aggression. '
                + 'That includes, but is not limited to:\n\n'
                + '```YAML\n'
                + '- Gender, Race, Ethnicity, Age, Sexuality, Religious Affiliation/Beliefs, Political Affiliation/Beliefs or background.'
                + '```\n'
                + '3.2.	Avoid any sensitive topics/jokes as much as possible as we’re only a Genshin Impact-related server. '
                + 'Do not post any messages or images that may be too extreme in nature. '
                + 'That includes, but is not limited to:\n\n'
                + '```YAML\n'
                + '- Suicide, NSFL, Gore, Animal Abuse, and Death.'
                + '```\n'
                + '3.3.	Borderline topics are allowed, but should stop as soon people feel uncomfortable with it. '
                + 'If the topic talk refuses to stop, the person can ping the active admins for assistance.');

		embed5
			.setColor(color.info)
			.setTitle('Rule #4')
			.setDescription('Any NSFW content is strictly prohibited, as members may feel uncomfortable about this topic. '
                + 'Do not post any NSFW/R-18 such as images that may be too obscene in nature, '
                + 'i.e; Scat, Vore, Goro, Blood, Lolis, Shotas, Rape, Hentai, Pornography, Explicit Nudity, Sexual Content.\n\n'
                + 'While this has a broad field and everyone has a different opinion on what constitutes as NSFW, here are a couple of guidelines:\n\n'
                + '```YAML\n'
                + '- No genitalia or other sexual body parts, including nipples, vaginas, or erections. '
                + 'Any covered but visible cases will fall under this category (Sexually suggestive poses or shameful or inappropriate situations).\n\n'
                + '- No implied nudity or sexual activity.\n\n'
                + '- Cropping images to focus specifically to make it seem sexually suggestive is also not allowed.\n\n'
                + '- Linking of NSFW art or doujins. Be it through the direct URL, name, gallery number or any other form of indirect linking, obfuscating, '
                + 'including wordplay and using Unicode characters. Regardless of whether you hide the Discord preview or not.\n\n'
                + '- Discussion of the tags and content of art or doujins.\n\n'
                + '- Comments of sexual acts such as:\n'
                + '"I\'d like to fuck ??? character."\n'
                + '"I\'d like ??? to suck my..."\n\n'
                + '- Comments of sexual violence such as rape, prostitution, trafficking, assault, etc. '
                + 'This will be considered separate from the other rules as a grave punishment leading to a permanent ban.\n\n'
                + '- Sharing links or images of exposed skin or body parts and messages with sexual innuendos with the intent of riling up sexual desires.\n\n'
                + '- Fantasizing or roleplaying in a sexual context or nature.\n\n'
                + '- This rule will also extend to profile pictures and nicknames, and text-based violations will also be judged on a similar guideline.'
                + '```');

		embed6
			.setColor(color.info)
			.setTitle('Rule #5')
			.setDescription('Channel Relevancy, please use the individual text and voice channels appropriately (e.g. stay on-topic).\n\n'
                + 'Please read the channel descriptions in <#815667258079576085> as well as channel topics and use them for their intended purpose only as much as possible. '
                + 'Going off-topic every now and then is fine, but members of the staff will direct you to the appropriate channel as they deem needed. '
                + 'People who derail conversations and are persistent in flooding a channel with unrelated things will receive corresponding sanction.');

		embed7
			.setColor(color.info)
			.setTitle('Rule #6')
			.setDescription('We advise you to pay attention to what you download, and that the Paimon Impact cannot be held accountable if you download a malicious file.');

		embed8
			.setColor(color.info)
			.setTitle('Rule #7')
			.setDescription('We advise you to not talk about Buying and/or Trading Accounts, Hacking, Cheating, Glitching, Exploiting Bugs any of the games we support. '
                + 'Anything that\'s really against the Terms of Service of most games is not allowed to be talked about in here.');

		embed9
			.setColor(color.info)
			.setTitle('Rule #8')
			.setDescription('Respect the staff, their decisions, and their actions.\n\n'
                + 'Do not dispute the staff decisions in the public channels or group chats. Furthermore, do not cause trouble like encouraging muting or banning other members for no reason. '
                + 'The rules are subject to the staff\'s interpretation. Furthermore, avoid pinging them for unnecessary matters unless they are actively chatting.');

		embed10
			.setColor(color.info)
			.setTitle('Have fun around the group!')
			.setDescription('This set of rules is subject to change and an announcement will be made if there are changes to the above rules.\n\n'
                + 'Do not ever feel pressured about all the rules above, as any normal/decent person will normally not violate the rules. '
                + 'Just keep it cool around here and you’ll be fine for sure. We’re not so strict so don’t worry about it too much!\n\n'
                + 'Please note that any other actions that cause problems will be dealt with as necessary, just because it\'s not specifically listed here doesn\'t mean it\'s allowed. '
                + 'We judge each and every situation individually and take action based on the severity and regularity of an offense.\n\n'
                + '𝘼𝙙 𝘼𝙨𝙩𝙧𝙖 𝘼𝙗𝙮𝙨𝙨𝙤𝙨𝙦𝙪𝙚, 𝙏𝙧𝙖𝙫𝙚𝙡𝙡𝙚𝙧');

		embed11
			.setColor(color.info)
			.setTitle('I disagree with my punishment, how can I appeal?')
			.setDescription('If you feel that you were punished erroneously or the decision to punish you was made without proper context, '
                    + 'please send a direct message to <@&841145376609927240> or <@&815560590156103740>. '
                    + 'The appeal should contain the following, in as much detail as you find appropriate:\n\n'
                    + '```YAML\n'
                    + '- A description of your actions and whether you believe your ban was justified\n'
                    + '- The thought process behind your actions leading up to your time out\n'
                    + '- Why your time out should be appealed\n'
                    + '- Any additional thoughts on your time out'
                    + '```\n'
                    + 'Please note that your appeal will not be considered if it lacks detail or isn\'t taken seriously.');

		embed12
			.setColor(color.info)
			.setDescription('After reading our rules please proceed to <#841168675700867072> channel.');

		await webhookMessage(
			client,
			message,
			{
				embeds: [
					embed1,
					embed2,
					embed3,
					embed4,
					embed5,
				],
			},
			'Paimon Impact',
			null,
		);

		await webhookMessage(
			client,
			message,
			{
				embeds: [
					embed6,
					embed7,
					embed8,
					embed9,
					embed10,
					embed11,
					embed12,
				],
			},
			'Paimon Impact',
			null,
		);

		await message.delete({ timeout: 1000 });
	},
	permission: ['ADMINISTRATOR'],
	servers: ['785156593935056967'],
};