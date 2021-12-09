import { MessageEmbed } from 'discord.js';

interface IRaid {
	cleric: string;
	raidName: string;
	category?: string;
	status?: string;
	rolesRequired?: string;
	raid_party?: string;
	invoiceAddress?: string;
	start_date?: string;
	end_date?: string;
	comments?: string;
	consultation?: string;
	related_raids?: string;
}
function messageTemplate(raidObject: IRaid): MessageEmbed {
	let timeframe;
	raidObject.rolesRequired = raidObject.rolesRequired
		? raidObject.rolesRequired
		: 'No roles specified';

	raidObject.raid_party = raidObject.raid_party
		? raidObject.raid_party
		: 'No raid party has claimed this raid yet';

	raidObject.invoiceAddress = raidObject.invoiceAddress
		? raidObject.invoiceAddress
		: 'No invoice address set';

	if (raidObject.start_date && raidObject.end_date) {
		timeframe = `${raidObject.start_date} - ${raidObject.end_date}`;
	} else if (raidObject.start_date) {
		timeframe = `Start date: ${raidObject.start_date}`;
	} else if (raidObject.end_date) {
		timeframe = `Due date: ${raidObject.end_date}`;
	} else {
		timeframe = 'No time frame set';
	}

	raidObject.comments = raidObject.comments
		? raidObject.comments
		: 'No description';

	raidObject.consultation = raidObject.consultation
		? raidObject.consultation
		: 'No consultation associated with this raid';

	raidObject.related_raids = raidObject.related_raids
		? raidObject.related_raids
		: 'No raids are related to this raid';

	const embedMessage = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Raid Creation')
		.setURL('https://dev-dungeon-master-v1.vercel.app/')
		.setAuthor(
			`DM-Bot`,
			'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/eff056f1-3571-446c-bb5a-99d24505c572/raidguild__icon.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211208T042218Z&X-Amz-Expires=86400&X-Amz-Signature=fc3767f5989cbbc3dc480e2230833216eb03975c88d7b52ec75255d7ce53d899&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22raidguild__icon.png%22&x-id=GetObject'
		)
		.addFields(
			{ name: `${raidObject.raidName}`, value: `${raidObject.comments}` },
			{ name: '\u200B', value: '\u200B' },
			{
				name: 'Cleric:',
				value: `${raidObject.cleric}`,
				inline: true,
			},
			{
				name: 'Category:',
				value: `${raidObject.category}`,
				inline: true,
			},
			{
				name: 'Status:',
				value: `${raidObject.status}`,
				inline: true,
			},
			{ name: '\u200B', value: '\u200B' }
		)
		.addField('Roles required:', `${raidObject.rolesRequired}`, true)
		.addField('Raid Party:', `${raidObject.raid_party}`, true)
		.addField('Related Raids:', `${raidObject.related_raids}`, true)
		.addField('\u200B', '\u200B')
		.addField('Consultation:', `${raidObject.consultation}`, true)
		.addField('Invoice Address:', `${raidObject.invoiceAddress}`, true)
		.addField('Start Date - End date:', `${timeframe}`, true);

	embedMessage
		.setImage(
			'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a97da329-3663-4e42-b610-38e3a8a2e9e7/Group_113.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211208T041350Z&X-Amz-Expires=86400&X-Amz-Signature=9b38d18d93077de6fd51aa4eed4e8571672d4e9979acefd97c772c25a73cdb6e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Group%2520113.png%22&x-id=GetObject'
		)
		.setTimestamp()
		.setFooter(
			'See a bug? Feel free to DM MSK!',
			'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/eff056f1-3571-446c-bb5a-99d24505c572/raidguild__icon.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211208T042218Z&X-Amz-Expires=86400&X-Amz-Signature=fc3767f5989cbbc3dc480e2230833216eb03975c88d7b52ec75255d7ce53d899&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22raidguild__icon.png%22&x-id=GetObject'
		);

	return embedMessage;
}

export function createRaidMessage(raidObject: IRaid) {
	const createRaidMessage = messageTemplate(raidObject);
	createRaidMessage.setDescription(
		'Fill out all the neccessary information to form a raid. Cleric is the creator of the raid.'
	);
	return createRaidMessage;
}

export function updateRaidMessage(raidObject: IRaid) {
	const createRaidMessage = messageTemplate(raidObject);
	createRaidMessage.setDescription('The raid has been updated!');
	return createRaidMessage;
}
