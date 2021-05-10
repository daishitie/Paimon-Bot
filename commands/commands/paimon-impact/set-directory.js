const { MessageEmbed } = require('discord.js');
const embed1 = new MessageEmbed();
const embed2 = new MessageEmbed();
const embed3 = new MessageEmbed();
const embed4 = new MessageEmbed();
const embed5 = new MessageEmbed();
const embed6 = new MessageEmbed();
const embed7 = new MessageEmbed();
const embed8 = new MessageEmbed();

const webhookMessage = require('@util/webhook-message');
const { color } = require('@root/config-paimon-impact.json');

module.exports = {
	commands: ['setdirectory'],
	description: 'Send the set of directories.',
	cooldown: 3,
	callback: async (message, arguments, text, client, cache) => {
		embed1
			.setColor(color.info)
			.setTitle('─ Server Directory')
			.setDescription('*This is your guide to the server\'s channels that vary in topics.*')
			.setImage('https://cdn.discordapp.com/attachments/819102097218863117/825272783726051338/paimon_impact_server_directory.png');

		embed2
			.setColor(color.info)
			.setTitle('Start Here')
			.setDescription('<#815654127492661249>\nPaimon Impact discord server rules.\n'
                + '<#841168675700867072>\nSelf-assigned role.\n'
                + '<#815667258079576085>\nThis is your guide to the server\'s channels that vary in topics.');

		embed3
			.setColor(color.info)
			.setTitle('Information')
			.setDescription('<#815806492753657857>\nPaimon Impact official news and announcements.\n'
                + '<#815806638572699688>\nPaimon Impact discord server updates.\n'
                + '<#819672367134670849>\nGenshin Impact live server time.\n'
                + '<#815806737093099541>\nGenshin Impact news, updates, and announcements.\n');

		embed4
			.setColor(color.info)
			.setTitle('Events')
			.setDescription('<#841167062448865322>\nPaimon Impact official events.\n'
                + '<#826280370550472735>\nCommunity public events.');

		embed5
			.setColor(color.info)
			.setTitle('General')
			.setDescription('<#815661801739911178>\nGeneral Discussion.\n'
                + '<#815661881984417812>\nUse this channel for queueing, avoid any unnecessary conversation.\n'
                + '<#825120371770523658>\nUse this if you didn\'t have any mic.');

		embed6
			.setColor(color.info)
			.setTitle('Genshin Impact')
			.setDescription('<#785491139993272320>\nGenshin Impact discussion.\n'
                + '<#825340114007097354>\nGenshin Impact power flex!\n'
                + '<#841320087994892309>\nGenshin Impact community guides.');

		embed7
			.setColor(color.info)
			.setTitle('Honkai Impact')
			.setDescription('<#835888727183851550>\nHonkai Impact discussion.\n'
                + '<#835891046939754516>\nHonkai Impact power flex!\n'
                + '<#835890643191726120>\nHonkai Impact community guides.');

		embed8
			.setColor(color.info)
			.setTitle('CO-OP')
			.setDescription('<#829840698470825994>\nCommunity farming schedules.\n'
                + '<#824530618875641876>\nNeed co-op or help with domain or farm? Just leave a message here.\n'
                + '<#841159328282574858>\nCo-op AutoChannel bot commands, avoid any unnecessary conversation.');

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
					embed6,
					embed7,
					embed8,
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