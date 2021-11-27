import { CommandInteraction } from 'discord.js';
import {
	Discord,
	Guild,
	Slash,
	SlashChoice,
	SlashGroup,
	SlashOption,
} from 'discordx';

enum categoryChoices {
	'Full Stack' = 'fullstack',
	'Front-End' = 'frontend',
	'Back-End' = 'backend',
	'raidName' = 'raidName',
}
@Discord()
@SlashGroup('raid', 'All raid operations are under /raid.')
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
	// @Guild('883080647210598410')
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
		@SlashChoice('Full Stack', 'Full Stack')
		@SlashChoice('Front-end', 'Front-end')
		@SlashChoice('Back-end', 'Back-end')
		category: string,

		@SlashOption('status', {
			description: 'Current status of the raid.',
			required: true,
		})
		@SlashChoice('Pending', 'Pending')
		@SlashChoice('Forming Raid', 'Forming')
		@SlashChoice('Active', 'Active')
		status: string,

		@SlashOption('invoice-address', {
			description: 'Invoice address',
		})
		invoiceAddress: string,

		interaction: CommandInteraction
	) {
		this.raid_name = raidName;
		this.cleric = interaction.member.user.toString();
		this.category = category;
		this.status = status;
		this.invoice_address = invoiceAddress;
		let message = `Cleric: ${this.cleric}\n`;

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
