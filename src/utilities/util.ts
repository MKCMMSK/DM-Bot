export function stringToArray(stringToConvert: string) {
	return stringToConvert.replace(/\s/g, '').split(',');
}
