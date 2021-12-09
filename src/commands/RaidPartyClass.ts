import { CommandInteraction } from 'discord.js';
import { Discord, Guild, Slash, SlashChoice, SlashOption } from 'discordx';

@Discord()
export class RaidParty {
	members!: [string];
	raid!: string;

	@Slash('create', {
		description: 'This will begin the process of forming a party.',
	})
	create(
		@SlashOption('raid-name', {
			description: 'Name of the raid your party wishes to take on.',
			required: true,
		})
		raidName: string,

		@SlashOption('members', {
			description:
				'List your members seperated by commas. E.g. MSK,flip,govinda.',
			required: true,
		})
		members: string,

		interaction: CommandInteraction
	) {

		interaction.reply('Your party has been been formed, get preparing!');
	}
}
