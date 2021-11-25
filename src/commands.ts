import * as dotenv from 'dotenv';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

dotenv.config();

const clientToken = process.env.CLIENT_TOKEN ?? 'undefined';
const clientID = process.env.CLIENT_ID ?? 'undefined';
const serverID = process.env.GUILD_ID ?? 'undefined';
const rest = new REST({ version: '9' }).setToken(clientToken);

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
];

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationGuildCommands(clientID, serverID), {
			body: commands,
		});

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
