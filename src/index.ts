import dotenv from 'dotenv';
import 'reflect-metadata';
import { Intents } from 'discord.js';
import { Client } from 'discordx';

async function start() {
	const result = dotenv.config();
	const clientToken = process.env.CLIENT_TOKEN ?? 'undefined';
	console.log(result, ' token');
	const client = new Client({
		botId: 'DM-Bot',
		// partial configuration required to enable direct messages
		partials: ['CHANNEL', 'MESSAGE'],
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.DIRECT_MESSAGES,
		],
	});

	client.on('ready', async () => {
		console.log(`Logged in as ${client.user?.tag}!`);
		await client.initApplicationCommands();
		await client.initApplicationPermissions();
		const applicationCommands = await client.fetchApplicationCommands();
		console.log(applicationCommands, ' commands');
	});

	client.on(
		'interactionCreate',
		async (interaction: {
			isCommand?: any;
			reply?: any;
			commandName?: any;
		}) => {
			if (!interaction.isCommand()) return;

			const { commandName } = interaction;
			if (commandName === 'ping') {
				await interaction.reply('Pong!');
			}
		}
	);
	client.login(clientToken);
}

start();
