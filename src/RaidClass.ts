import { Discord, Guild, Slash } from 'discordx';

@Discord()
export class Raid {
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
	constructor(
		cleric: string,
		raid_name: string,
		status: string,
		category: string
	) {
		this.cleric = cleric;
		this.raid_name = raid_name;
		this.status = status;
		this.category = category;
	}
	// @Guild('883080647210598410')
	@Slash('create')
	public create() {
		console.log('raid was created');
		return 'we hit the create!';
	}
}
