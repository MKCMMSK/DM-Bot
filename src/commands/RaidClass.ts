import { CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';
import { MessageEmbed } from 'discord.js';

enum categoryChoices {
	'Full Stack' = 'Full Stack',
	'Front-End' = 'Front-End',
	'Back-End' = 'Back-End',
}
enum statusChoices {
	'Pending' = 'Pending',
	'Active' = 'Active',
	'Forming Raid' = 'Forming Raid',
}

@Discord()
@SlashGroup('raid', 'All raid operations are under /raid *command*.')
export abstract class Raid {
	cleric!: string;
	portfolio!: string;
	legacy!: {
		airtable_id: string;
		escrow_index: number;
		locker_hash: string;
	};
	@Slash('create', {
		description:
			'Fill out all the neccessary information to form a raid. Cleric is the creator of the raid.',
	})
	createRaid(
		@SlashOption('raidname', {
			description: 'Name of the raid.',
			required: true,
		})
		raidName: string,

		@SlashOption('category', {
			description: 'Which category does this raid fall into?',
			required: true,
		})
		@SlashChoice(categoryChoices)
		category: string,

		@SlashOption('status', {
			description: 'Current status of the raid.',
			required: true,
		})
		@SlashChoice(statusChoices)
		status: string,

		@SlashOption('roles-required', {
			description:
				'Roles required for the raid. No duplicate roles, seperate them with commas. E.g., Warrior, Bard.',
		})
		rolesRequired: string,

		@SlashOption('raid-party', {
			description: 'Add an existing raid party to tackle this raid.',
		})
		raid_party: string,

		@SlashOption('invoice-address', {
			description: 'Invoice address.',
		})
		invoiceAddress: string,

		@SlashOption('start-date', {
			description: 'Input start date under this format YYYY-mm-dd.',
		})
		start_date: string,

		@SlashOption('end-date', {
			description: 'Input end date under this format YYYY-mm-dd.',
		})
		end_date: string,

		@SlashOption('comment', {
			description:
				'Add any comments or additional information the raid needs.',
		})
		comments: string,

		@SlashOption('consultation', {
			description: 'Connect to an existing consultation.',
		})
		consultation: string,

		@SlashOption('related-raids', {
			description:
				'Connect to related raids. Seperate multiple raids with commas.',
		})
		related_raids: string,

		interaction: CommandInteraction
	) {
		this.cleric = interaction.member.user.toString();
		let message = `Cleric: ${this.cleric}\n`;

		console.log(invoiceAddress, ' invoice address');

		if (raidName) {
			message = `Raid: ${raidName} \n` + message;
		}
		if (category) {
			message += `Category: ${category} \n`;
		}
		if (status) {
			message += `Status: ${status}\n`;
		}
		if (invoiceAddress) {
			message += `Invoice Address: ${invoiceAddress}\n`;
		}
		interaction.reply(message);
		interaction.followUp(message);
	}

	@Slash('update')
	public update(interaction: CommandInteraction) {
		interaction.reply('hello this is create raid');
	}
}
