import { CommandInteraction } from 'discord.js';
import { Discord, Guild, Slash, SlashChoice, SlashOption } from 'discordx';

@Discord()
export class Bot {
	// @Guild('883080647210598410')
	@Slash('help', {
		description: 'This will display all commands and flags.',
	})
	help(interaction: CommandInteraction) {
		interaction.reply('This is help');
	}
}
