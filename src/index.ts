import dotenv from 'dotenv';
import 'reflect-metadata';
import { Intents } from 'discord.js';
import { Client } from 'discordx';
import { Raid } from './RaidClass.js';

async function start() {
	const raid = new Raid('test', 'test', 'test', 'test');
	dotenv.config();
	const clientToken = process.env.CLIENT_TOKEN ?? 'undefined';
	const client = new Client({
		botId: 'DM-Bot',
		// partial configuration required to enable direct messages
		partials: ['CHANNEL', 'MESSAGE'],
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.DIRECT_MESSAGES,
		],
		botGuilds: [client => client.guilds.cache.map(guild => guild.id)],
	});

	client.on('ready', async () => {
		console.log(`Logged in as ${client.user?.tag}!`);
		// await client.clearApplicationCommands('883080647210598410');
		await client.initApplicationCommands();
		await client.initApplicationPermissions();
		const fetchCommands = await client.fetchApplicationCommands(
			'883080647210598410'
		);
		console.log(fetchCommands, ' fetched commands');
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
			} else if (commandName === 'create') {
				raid.create();
				await interaction.reply('Raid has been created!');
			}
		}
	);
	client.login(clientToken);
}

start();
