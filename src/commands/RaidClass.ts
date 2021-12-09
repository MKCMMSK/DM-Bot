import { CommandInteraction } from 'discord.js';
import {
	Client,
	Discord,
	Slash,
	SlashChoice,
	SlashGroup,
	SlashOption,
} from 'discordx';
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

		const embedMessage = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Raid Creation')
			.setURL('https://dev-dungeon-master-v1.vercel.app/')
			.setAuthor(`DM-Bot`, 'https://i.imgur.com/AfFp7pu.png')
			.setDescription(
				'Fill out all the neccessary information to form a raid. Cleric is the creator of the raid.'
			)
			.addFields(
				{ name: `${raidName}`, value: 'Some value here' },
				{ name: 'Comments:', value: `${comments}` },
				{ name: '\u200B', value: '\u200B' },
				{
					name: 'Cleric:',
					value: `${this.cleric}`,
					inline: true,
				},
				{
					name: 'Category:',
					value: `${category}`,
					inline: true,
				},
				{
					name: 'Status:',
					value: `${status}`,
					inline: true,
				},
				{ name: '\u200B', value: '\u200B' }
			)
			.addField('Roles required:', `${rolesRequired}`, true)
			.addField('Raid Party:', `${raid_party}`, true)
			.addField('Related Raids:', `${related_raids}`, true)
			.addField('\u200B', '\u200B')
			.addField('Consultation:', `${consultation}`, true)
			.addField('Invoice Address:', `${invoiceAddress}`, true)
			.addField(
				'Start Date - End date:',
				`${start_date} - ${end_date}`,
				true
			);

		embedMessage
			.setImage('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp()
			.setFooter(
				'Some footer text here',
				'https://i.imgur.com/AfFp7pu.png'
			);

		interaction.reply({ ephemeral: true, embeds: [embedMessage] });
	}

	@Slash('update')
	public update(interaction: CommandInteraction) {
		interaction.reply('hello this is create raid');
	}
}
