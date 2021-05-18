const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();

const moment = require('moment-timezone');

const firstMessage = require('@util/first-message');

const timezone = ['NA', 'EU', 'ASIA', 'SAR'];

embed.setColor('#2f3136')
	.setTitle('Server Time')
	.setImage('https://cdn.discordapp.com/attachments/819277662211932172/844055411879444480/60ebddd20a71d2291c125f366d9f5529.jpeg');

module.exports = async (client, channels) => {
	if (typeof channels === 'string') channels = [channels];

	let reset = undefined;

	moment.relativeTimeThreshold('m', 60);
	moment.relativeTimeThreshold('h', 24 * 2);

	timezone.forEach(async (timezone) => {
		let currentTime,
			dailyReset = '',
			weeklyReset = '';

		switch (timezone) {
		case 'NA':
			currentTime = `\`\`\`md\n# ${timezone} `;
			timezone = 'America/Chicago';
			time = '090000';
			break;
		case 'EU':
			currentTime = `\`\`\`text\n# ${timezone} `;
			timezone = 'Europe/Paris';
			time = '030000';
			break;
		case 'ASIA':
			currentTime = `\`\`\`glsl\n# ${timezone} `;
			timezone = 'Asia/Manila';
			time = '20000';
			break;
		case 'SAR':
			currentTime = `\`\`\`fix\n# ${timezone} `;
			timezone = 'Asia/Taipei';
			time = '20000';
			break;
		default:
			timezone = 'Asia/Manila';
			time = '00000';
			currentTime = '```text\n# DEFAULT ';
		}

		currentTime += `${moment().tz(timezone).format('hh:mm A')}\`\`\``;

		if (moment().tz(timezone) >= moment(time, 'hhmmss').tz(timezone)) {
			timeDiff = moment.duration(
				moment(time, 'hhmmss').tz(timezone)
					.add(1, 'days')
					.diff(moment().tz(timezone)),
			);

			diffHours = parseInt('' + (timeDiff.asHours()) * 1) / 1;
			if (diffHours >= 1) dailyReset = `${diffHours} hours and `;

			timeDiff = moment.duration(
				moment(time, 'hhmmss').tz(timezone)
					.add(1, 'days')
					.subtract(diffHours, 'hours')
					.diff(moment().tz(timezone)),
			);

			diffMinutes = Math.round(timeDiff.asMinutes() * 1) / 1;

			if (diffHours >= 1 || diffMinutes >= 1) {
				dailyReset = `${dailyReset}${diffMinutes} minutes`;
			}
			else if (diffHours <= 0 && diffMinutes <= 0) {dailyReset = 'a few seconds';}
		}
		else {
			timeDiff = moment.duration(moment(time, 'hhmmss').tz(timezone).diff(moment().tz(timezone)));
			diffHours = parseInt('' + (timeDiff.asHours()) * 1) / 1;
			if (diffHours >= 1) dailyReset = `${diffHours} hours and `;

			timeDiff = moment.duration(
				moment(time, 'hhmmss').tz(timezone)
					.subtract(diffHours, 'hours')
					.diff(moment().tz(timezone)),
			);

			diffMinutes = Math.round(timeDiff.asMinutes() * 1) / 1;

			if (diffHours >= 1 || diffMinutes >= 1) {
				dailyReset = `${dailyReset}${diffMinutes} minutes`;
			}
			else if (diffHours <= 0 && diffMinutes <= 0) {dailyReset = 'a few seconds';}
		}

		if (moment().tz(timezone) > moment().tz(timezone).startOf('isoweek').add(4, 'hours')) {
			timeDiff = moment.duration(
				moment().tz(timezone)
					.startOf('isoweek')
					.add(7, 'days')
					.add(4, 'hours')
					.diff(moment().tz(timezone)),
			);

			diffDays = parseInt('' + (timeDiff.asDays()) * 1) / 1;
			if (diffDays >= 1) weeklyReset = `${diffDays} days, `;

			timeDiff = moment.duration(
				moment().tz(timezone)
					.startOf('isoweek')
					.add(7, 'days')
					.add(4, 'hours')
					.subtract(diffDays, 'days')
					.diff(moment().tz(timezone)),
			);

			diffHours = parseInt('' + (timeDiff.asHours()) * 1) / 1;

			if (diffDays >= 1 || diffHours >= 1) weeklyReset = `${weeklyReset}${diffHours} hours and `;

			timeDiff = moment.duration(
				moment().tz(timezone)
					.startOf('isoweek')
					.add(7, 'days')
					.add(4, 'hours')
					.subtract(diffDays, 'days')
					.subtract(diffHours, 'hours')
					.diff(moment().tz(timezone)),
			);

			diffMinutes = Math.round(timeDiff.asMinutes() * 1) / 1;

			if (diffDays >= 1 || diffHours >= 1 || diffMinutes >= 1) {
				weeklyReset = `${weeklyReset}${diffMinutes} minutes`;
			}
			else if (
				diffDays <= 0 &&
                    diffHours <= 0 &&
                    diffMinutes <= 0
			) {weeklyReset = 'a few seconds';}
		}
		else {
			timeDiff = moment.duration(
				moment().tz(timezone)
					.startOf('days')
					.add(4, 'hours')
					.diff(moment().tz(timezone)),
			);

			diffHours = parseInt('' + (timeDiff.asHours()) * 1) / 1;
			if (diffHours >= 1) weeklyReset = `${diffHours} hours and `;

			timeDiff = moment.duration(
				moment().tz(timezone).startOf('days')
					.add(4, 'hours')
					.subtract(diffHours, 'hours')
					.diff(moment().tz(timezone)),
			);

			diffMinutes = Math.round(timeDiff.asMinutes() * 1) / 1;

			if (diffHours >= 1 || diffMinutes >= 1) {
				weeklyReset = `${weeklyReset}${diffMinutes} minutes`;
			}
			else if (diffHours <= 0 && diffMinutes <= 0) {weeklyReset = 'a few seconds';}
		}

		if (reset === undefined) {
			reset = `${currentTime}• Daily reset in ${dailyReset}\n• Weekly reset in ${weeklyReset}`;
		}
		else {
			reset += `${currentTime}• Daily reset in ${dailyReset}\n• Weekly reset in ${weeklyReset}`;
		}
	});

	channels.forEach(async (channel) => await firstMessage(client, channel, { embed: embed.setDescription(reset) }, []));
};