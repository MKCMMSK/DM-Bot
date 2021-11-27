import { CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from 'discordx';

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
	raid_name!: string;
	status!: string;
	category!: string;
	cleric!: string;
	roles_required!: [string];
	raid_party!: string;
	invoice_address!: string;
	start_date!: string;
	end_date!: string;
	comments!: [string];
	consultation!: string;
	related_raids!: [string];
	portfolio!: string;
	legacy!: {
		airtable_id: string;
		escrow_index: number;
		locker_hash: string;
	};
	@Slash('create', {
		description: 'Fill out all the neccessary information to form a raid.',
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

		@SlashOption('invoice-address', {
			description: 'Invoice address',
		})
		invoiceAddress: string,

		// @SlashOption('roles-required', {
		// 	description:
		// 		'Roles that will be required for the raid, no need to enter duplicate roles.',
		// })
		// rolesRequired: [string],

		interaction: CommandInteraction
	) {
		this.raid_name = raidName;
		this.cleric = interaction.member.user.toString();
		this.category = category;
		this.status = status;
		// this.invoice_address = invoiceAddress;
		// this.roles_required = rolesRequired ?? [];
		let message = `Cleric: ${this.cleric}\n`;

		console.log(this.invoice_address, ' invoice address');

		if (raidName) {
			message = `Raid: ${this.raid_name} \n` + message;
		}
		if (category) {
			message += `Category: ${this.category} \n`;
		}
		if (status) {
			message += `Status: ${this.status}\n`;
		}
		if (invoiceAddress) {
			message += `Invoice Address: ${this.invoice_address}\n`;
		}
		interaction.reply(message);
	}

	@Slash('update')
	public update(interaction: CommandInteraction) {
		interaction.reply('hello this is create raid');
	}
}
