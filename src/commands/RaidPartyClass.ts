import { CommandInteraction } from 'discord.js';
import { Discord, Guild, Slash, SlashChoice, SlashOption } from 'discordx';

@Discord()
export class RaidParty {
	members!: [string];
	raid!: string;

	@Slash('create', {
		description: 'This will begin the process of forming a party.',
	})
	help(interaction: CommandInteraction) {
		interaction.reply('Your party has been been formed, get preparing!');
	}
}
