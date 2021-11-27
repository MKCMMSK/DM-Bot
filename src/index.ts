import dotenv from 'dotenv';
import 'reflect-metadata';
import { Intents, Interaction } from 'discord.js';
import { Client } from 'discordx';
import { dirname, importx } from '@discordx/importer';

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
	// await client.clearApplicationCommands('883080647210598410');
	await client.initApplicationCommands({
		guild: { log: true },
		global: { log: true },
	});
	await client.initApplicationPermissions(true);
	console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', (interaction: Interaction) => {
	client.executeInteraction(interaction);
});

async function run() {
	await importx(dirname(import.meta.url) + '/commands/**/*.{ts,js}');
	client.login(clientToken);
}

run();
